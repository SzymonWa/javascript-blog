'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagsLink: Handlebars.compile(document.querySelector('#template-tags-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}
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

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector='.post-tags .list',
  optAuthorsSelector='.post-author',
  optTagsListSelector='.tags.list',
  optCloudClassCount=5,
  optCloudClassPrefix='tag-size-',
  optAuthorsListSelector='.list.authors';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){
    

    /* get the article id */
    const articleId =article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */
    
    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateMinMax(tags){
  const params = {
    min: 999999,
    max: 0
  };
  for(let tag in tags){
    //console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  //console.log(params);
  return params;
}

function calculateClass(count,params){
  //console.log(count);
  //console.log(params.min);
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
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
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagsLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      }else{
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapperTags.innerHTML=html;
    
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateMinMax(allTags);
  const allTagsData = {tags: []};
  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag ,
      count: allTags[tag],
      className: calculateClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(templates.tagCloudLink(allTagsData));
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

  /* find all tag links with class active */
  const allTags= document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagList of allTags){
    /* remove class active */
    tagList.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allHrefs= document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let hrefList of allHrefs){
    /* add class active */
    hrefList.classList.add('active');

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
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    
    /* find author wrapper */
    const authorTags = article.querySelector(optAuthorsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get authors from data-author attribute */
    const articleTags=article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTMLData = {id: articleTags, title: articleTags};
    const linkHTML = templates.authorLink(linkHTMLData);
    
    /* add generated code to html variable */
    html = html + linkHTML;
    if(!allTags.hasOwnProperty(articleTags)){
      /* [NEW] add generated code to allTags array */
      allTags[articleTags] = 1;
    }else{
      allTags[articleTags]++;
    }
    /* insert HTML of all the links into the tags wrapper */
    authorTags.innerHTML=html;
  /* END LOOP: for every article: */
  }
  const tagList = document.querySelector(optAuthorsListSelector);
  const tagsParams = calculateMinMax(allTags);
  const allTagsData = {tags: []};
  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.authorCloudLink(allTagsData);
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href'); 

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#author-', ''); 

  /* find all tag links with class active */
  const allTags= document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for (let tagList of allTags){
    /* remove class active */
    tagList.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allHrefs= document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let hrefList of allHrefs){
    /* add class active */
    hrefList.classList.add('active');
    
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const allTags= document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let tag of allTags){
    /* add authorClickHandler as event listener for that link */
    tag.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

