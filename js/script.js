'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
	optArticleAuthorSelector = '.post .post-author';

function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    titleList.insertAdjacentHTML('beforeend', linkHTML);

    html = html + linkHTML;
  }

  titleList.innerHTML = html

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}


generateTitleLinks();

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const titleList = article.querySelector(optArticleTagsSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for(let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';

      titleList.insertAdjacentHTML('beforeend', linkHTML);

      html = html + linkHTML;
    }

    articles.innerHTML = html
  }

}

generateTags();

function tagClickHandler(event){
	event.preventDefault();
  const clickedElement = this;

	const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

	for (let tagLink of tagLinks) {
		tagLink.classList.add('active');
	}

}

function addClickListenersToTags(){

	const links = document.querySelectorAll('a[href^="#tag-"]');

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }

}

addClickListenersToTags();

function generateAuthors () {
	const articles = document.querySelectorAll(optArticleSelector);

	for (let article of articles) {
	  const author = article.querySelector(optArticleAuthorSelector);
	  let html = '';
	  const authorTags = article.getAttribute('data-author');
    const linkHTML = '<a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a>';

		author.insertAdjacentHTML('beforeend', linkHTML);

		html = html + linkHTML;

		articles.innerHTML = html
	}

}
generateAuthors ();

function authorClickHandler(event){
	event.preventDefault();
  const clickedElement = this;

	const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const dataAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let dataAuthor of dataAuthors) {
    dataAuthor.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

	for (let authorLink of authorLinks) {
		authorLink.classList.add('active');
	}

generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
	const links = document.querySelectorAll('a[href^="#author-"]');

  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }

}

addClickListenersToAuthors();
