import { getMetadata } from '../../scripts/aem.js';
import ffetch from '../../scripts/ffetch.js';

let searchBlogArticles;
let filterByCategory;
let allCategories;
let noArticlesFound;
let matching;
let inCategory;
let errorMessage;

async function loadTranslationsFromPlaceholders() {
  const placeholders = await ffetch('placeholders.json').all();
  searchBlogArticles = placeholders.find((item) => item.key === 'search_blog_article').value;
  filterByCategory = placeholders.find((item) => item.key === 'filter_by_category').value;
  allCategories = placeholders.find((item) => item.key === 'all_categories').value;
  noArticlesFound = placeholders.find((item) => item.key === 'no_articles_found').value;
  matching = placeholders.find((item) => item.key === 'matching').value;
  inCategory = placeholders.find((item) => item.key === 'in_category').value;
  errorMessage = placeholders.find((item) => item.key === 'error_message').value;
}

export default async function decorate(block) {
  loadTranslationsFromPlaceholders();
  const language = getMetadata('lang');

  const container = document.createElement('div');
  container.className = 'blog-filter-container';

  const form = document.createElement('form');
  form.className = 'blog-filter-form';
  form.addEventListener('submit', (e) => e.preventDefault());

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = searchBlogArticles;
  searchInput.setAttribute('aria-label', searchBlogArticles);
  searchInput.className = 'blog-filter-input';

  const categorySelect = document.createElement('select');
  categorySelect.className = 'blog-filter-select';
  categorySelect.setAttribute('aria-label', filterByCategory);
  const defaultOption = document.createElement('option');
  defaultOption.value = 'all';
  defaultOption.textContent = allCategories;
  categorySelect.appendChild(defaultOption);

  form.appendChild(searchInput);
  form.appendChild(categorySelect);

  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'blog-filter-results';

  container.appendChild(form);
  container.appendChild(resultsContainer);
  block.appendChild(container);

  let articles = [];

  function createArticleElement(article) {
    if (!article || typeof article !== 'object') return null;

    const articleElement = document.createElement('div');
    articleElement.className = 'blog-filter-article';

    const contentWrapper = document.createElement(
      article.path && typeof article.path === 'string' ? 'a' : 'div',
    );
    contentWrapper.className = 'blog-filter-article-content';

    if (article.path && typeof article.path === 'string') {
      contentWrapper.href = article.path;
    }

    if (article.category && typeof article.category === 'string' && article.category.trim()) {
      const category = document.createElement('div');
      category.className = 'blog-filter-article-category';
      category.textContent = article.category.trim();
      contentWrapper.appendChild(category);
    }

    const title = document.createElement('h3');
    title.className = 'blog-filter-article-title';
    title.textContent = article.title && typeof article.title === 'string'
      ? article.title.trim()
      : 'Untitled';
    contentWrapper.appendChild(title);

    if (article.description && typeof article.description === 'string' && article.description.trim()) {
      const description = document.createElement('p');
      description.className = 'blog-filter-article-description';
      description.textContent = article.description.trim();
      contentWrapper.appendChild(description);
    }

    articleElement.appendChild(contentWrapper);
    return articleElement;
  }

  function filterArticles(articleList, searchTerm, selectedCategory) {
    if (!articleList || !Array.isArray(articleList)) return [];

    const searchTermLower = searchTerm?.toLowerCase().trim() ?? '';
    const selectedCategoryLower = selectedCategory?.toLowerCase().trim() ?? '';

    return articleList.filter((article) => {
      if (!article || typeof article !== 'object') return false;
      if (article.path && /^\/[a-z]{2}\/blogs$/.test(article.path)) return false;

      const searchFields = [
        article.title,
        article.description,
        article.category,
        article.author,
        article.tags,
      ].filter(Boolean);

      const matchesSearch = !searchTermLower || searchFields.some((field) => {
        if (Array.isArray(field)) {
          return field.some((item) => typeof item === 'string' && item.toLowerCase().includes(searchTermLower));
        }
        return typeof field === 'string' && field.toLowerCase().includes(searchTermLower);
      });

      const matchesCategory = !selectedCategory
        || selectedCategory === 'all'
        || (article.category && typeof article.category === 'string'
            && article.category.toLowerCase() === selectedCategoryLower);

      return matchesSearch && matchesCategory;
    });
  }

  function updateResults(articleList, search, category, results) {
    if (!results) return;
    results.innerHTML = '';

    const searchTerm = search?.value?.trim() ?? '';
    const selectedCategory = category?.value ?? '';
    const filteredArticles = filterArticles(articleList, searchTerm, selectedCategory);

    const resultsHeader = document.createElement('div');
    resultsHeader.className = 'blog-filter-results-header';
    resultsHeader.textContent = `Found ${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''}`;
    results.appendChild(resultsHeader);

    if (filteredArticles.length === 0) {
      const noResults = document.createElement('p');
      noResults.className = 'blog-filter-no-results';
      noResults.textContent = searchTerm
        ? `${noArticlesFound} ${matching} "${searchTerm}"${selectedCategory !== 'all' ? ` ${inCategory} "${selectedCategory}"` : ''}`
        : `${noArticlesFound}.`;
      results.appendChild(noResults);
      return;
    }

    const articlesGrid = document.createElement('div');
    articlesGrid.className = 'blog-filter-articles-grid';
    filteredArticles.forEach((article) => {
      const articleElement = createArticleElement(article);
      if (articleElement) {
        articlesGrid.appendChild(articleElement);
      }
    });

    results.appendChild(articlesGrid);
  }

  try {
    const responseData = await ffetch(`/${language}/article-index.json`).all();

    if (!Array.isArray(responseData)) {
      throw new Error('Invalid response format');
    }

    articles = responseData.filter((item) => {
      if (!item || typeof item !== 'object') return false;
      return item.title?.trim() && item.path?.trim();
    });

    const hasCategories = articles.some((item) => item.category?.trim());

    if (!hasCategories) {
      categorySelect.style.display = 'none';
    } else {
      const uniqueCategories = articles
        .map((item) => item?.category)
        .filter((category) => category && typeof category === 'string' && category.trim() !== '')
        .filter((category, index, self) => self.indexOf(category) === index)
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

      if (uniqueCategories.length === 0) {
        categorySelect.style.display = 'none';
      } else {
        uniqueCategories.forEach((category) => {
          const option = document.createElement('option');
          option.value = category;
          option.textContent = category;
          categorySelect.appendChild(option);
        });
      }
    }

    let searchTimeout;
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        updateResults(articles, searchInput, categorySelect, resultsContainer);
      }, 300);
    };

    updateResults(articles, searchInput, categorySelect, resultsContainer);
    searchInput.addEventListener('input', handleSearch);
    categorySelect.addEventListener('change', () => updateResults(articles, searchInput, categorySelect, resultsContainer));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching or processing articles:', error);
    resultsContainer.innerHTML = `<p style="text-align: center; grid-column: 1 / -1;"> ${errorMessage}</p>`;
  }
}
