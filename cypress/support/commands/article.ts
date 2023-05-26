import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  title: 'TESTING ARTICLE',
  subtitle: 'Math',
  img: 'https://vsememy.ru/kartinki/wp-content/uploads/2023/02/1643599632_3-papik-pro-p-matematika-logotip-3.png',
  views: 112,
  createdAt: '26.05.2023',
  userId: '1',
  type: [
    'SCIENCE',
  ],
  blocks: [],
};

export const createArticle = (article?: Article) => cy.request({
  method: 'POST',
  url: 'http://localhost:8000/articles',
  headers: { Authorization: 'qwe' },
  body: article ?? defaultArticle,
}).then((resp) => resp.body);

export const removeArticle = (articleId: string) => cy.request({
  method: 'DELETE',
  url: `http://localhost:8000/articles/${articleId}`,
  headers: { Authorization: 'qwe' },
});

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
