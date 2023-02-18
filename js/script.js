'use strict';
function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector=clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',optTitleSelector = '.post-title',optTitleListSelector = '.titles',optArticleTagsSelector='.post-tags .list',optAuthorsSelector='.post-author',optTagsListSelector='.tags .list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){
    article.addEventListener('click', titleClickHandler);

    /* get the article id */
    const articleId =article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    
    /* create HTML of the link */
    const linkHTML = '<li><a href="#'+ articleId +'"><span>' + articleTitle+ '</span></a></li>';
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    
    /* find tags wrapper */
    const wrapperTags = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags=article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">'+ tag + ' </a></li> ';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapperTags.innerHTML=html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href'); 
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); 
  console.log(tag);
  /* find all tag links with class active */
  const allTags= clickedElement.querySelectorAll('a.active[href^="#tag-"]');
  console.log(allTags);
  /* START LOOP: for each active tag link */
  for (let tagList of allTags){
    /* remove class active */
    tagList.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allHrefs= document.querySelectorAll('a[href="' + href + '"]');
  console.log(allHrefs);
  /* START LOOP: for each found tag link */
  for (let hrefList of allHrefs){
    /* add class active */
    hrefList.classList.add('active');
    console.log(hrefList);
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const allTags= document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tag of allTags){
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for(let article of articles){
    
    /* find author wrapper */
    const authorTags = article.querySelector(optAuthorsSelector);
    console.log(authorTags);
    /* make html variable with empty string */
    let html = '';
    /* get authors from data-author attribute */
    const articleTags=article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleTags + '">'+ articleTags + '</a>';
    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the tags wrapper */
    authorTags.innerHTML=html;
  /* END LOOP: for every article: */
  }
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href'); 
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#author-', ''); 
  console.log(tag);
  /* find all tag links with class active */
  const allTags= clickedElement.querySelectorAll('a.active[href^="#author-"]');
  console.log(allTags);
  /* START LOOP: for each active tag link */
  for (let tagList of allTags){
    /* remove class active */
    tagList.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allHrefs= document.querySelectorAll('a[href="' + href + '"]');
  console.log(allHrefs);
  /* START LOOP: for each found tag link */
  for (let hrefList of allHrefs){
    /* add class active */
    hrefList.classList.add('active');
    console.log(hrefList);
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const allTags= document.querySelectorAll('a[href^="#author-"]');
  console.log(allTags);
  /* START LOOP: for each link */
  for (let tag of allTags){
    /* add authorClickHandler as event listener for that link */
    tag.addEventListener('click', authorClickHandler);
    console.log(tag);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

