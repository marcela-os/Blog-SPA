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
	optArticleAuthorSelector = '.post .post-author',
	optTagsListSelector = '.tags.list',
	optCloudClassCount = '5',
	optCloudClassPrefix = 'tag-size-',
	optAuthorsListSelector = '.authors.list';

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

function calculateTagsParams (tags) {
	const params = {
    max: '0',
    min: '999999'
  };

	for(let tag in tags){
  console.log(tag + ' is used ' + tags[tag] + ' times');
		if (tags[tag] > params.max) {
      params.max = tags[tag];
    }if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
	}

	return params;
}

function calculateAuthorsParams (articleAuthor) {
	const params = {
    max: '0',
    min: '999999'
  };

	for(let author in authors){
  console.log(author + ' is used ' + authors[articleAuthor] + ' times');
		if (authors[articleAuthor] > params.max) {
      params.max = authors[articleAuthor];
    }if (authors[articleAuthor] < params.min) {
      params.min = authors[articleAuthor];
    }
	}

	return params;
}

function calculateTagClass(count,params) {
	const normalizedCount = count - params.min;
	const normalizedMax = params.max - params.min;
	const percentage = normalizedCount / normalizedMax;
	const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
	const classValue = optCloudClassPrefix + classNumber;

  return classValue;

}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const classValue = optCloudClassPrefix + classNumber;

  return classValue;
}

function generateTags() {
  let allTags = {};
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

			/* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
      allTags[tag] = 1;
      } else {
      allTags[tag]++;
      }
    }

    articles.innerHTML = html
  }

	const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';
  const tagList = document.querySelector('.tags');

  for(let tag in allTags){
		const postTags = document.querySelector(optTagsListSelector);

		//const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
		const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) +'" href="#tag-' + tag + '">' + tag + '</a></li> ';
		console.log('tagLinkHTML',tagLinkHTML);
		allTagsHTML += tagLinkHTML;

		postTags.insertAdjacentHTML('beforeend', tagLinkHTML + ' (' + allTags[tag] + ') ');
	}

	tagList.innerHTML = allTagsHTML;

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
	let allAuthors = {};
	const articles = document.querySelectorAll(optArticleSelector);

	for (let article of articles) {
	  const author = article.querySelector(optArticleAuthorSelector);
	  let html = '';
	  const authorTags = article.getAttribute('data-author');
    const linkHTML = '<a href="#author-' + authorTags + '"><span>' + authorTags + '</span></a>';

		author.insertAdjacentHTML('beforeend', linkHTML);

		html = html + linkHTML;

		if(!allAuthors[articleAuthor]) {
		allAuthors[articleAuthor] = 1;
		} else {
		allAuthors[articleAuthor]++;
		}

		articles.innerHTML = html
	}

	const authorParams = calculateAuthorsParams(allAuthors);

  let allAuthorsHTML = '';
  const authorsList = document.querySelector('.authors');

  for(let articleAuthor in allAuthors){
		const articleAuthor = document.querySelector(optAuthorsListSelector);
		//const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ')</a></li>';
		const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[articleAuthor], authorsParams) +'" href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li> ';
		console.log('authorLink', authorLinkHTML);
		allAuthorsHTML += authorLinkHTML;

		articleAuthor.insertAdjacentHTML('beforeend', authorLinkHTML + ' (' + allAuthors[author] + ') ');
	}

	authorsList.innerHTML = allAuthorsHTML;

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
