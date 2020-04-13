'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/
/*const titleClickHandler = function(){
  console.log('Link was clicked!');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}*/


const titleClickHandler = function(event){
  //console.log(event);
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

console.log('clickedElement (with plus): ' + clickedElement);
clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
}

  /* [DONE] get 'href' attribute from the clicked link */

const articleSelector = clickedElement.getAttribute('href');
  console.log ('Link was clicked!', clickedElement);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

const targetArticle = document.querySelector(articleSelector);
  console.log ('ok');

  /* [DONE] add class 'active' to the correct article */

targetArticle.classList.add('active')


  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

//const titleList = document.querySelector(optTitleListSelector).innerHTML = '';

const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    titleList.innerHTML = '';

  /* for each article */

const articles = document.querySelectorAll(optArticleSelector);
  for(let articles of articles){
  article.classList.remove('post');
}
let html = '';

  for(let article of articles){

    /* get the article id */

const articleId = article.getAttribute('id');
console.log ('Get id', articleId);

    /* find the title element */

const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

const linkHTML = '<li><a href="#"' + articleId + '><span>' + articleTitle + '</span></a></li>';
console.log (articleTitle);

    /* create HTML of the link */

//titleList.innerHTML = titleList.innerHTML + linkHTML;
titleList.insertAdjacentHTML('afterend', linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
      }
      console.log('html:', html);

      titleList.innerHTML = html;
    }

    generateTitleLinks();
}

const links = document.querySelectorAll('.titles a');
console.log(links);

  for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
