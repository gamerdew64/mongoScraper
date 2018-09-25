# mongoScraper Overview
This is a web app that lets users view and leave comments on the latest news, but I am not writing any of these articles; instead, this application scrapes news from another site.

### NPM Packages/Dependencies that are Used:

1. express
2. express-handlebars
3. mongoose
4. body-parser
5. cheerio
6. request

### Deployment

* ***Please submit both the deployed Heroku link to your homework AND the link to the Github Repository!***

## Application Breakdown

* This scraper application accomplishes the following:

  1. Whenever a user visits the site, the app scrapes stories from ***Insert News Outlet Here*** and displays them for the user. The following information is scraped from each article:

     * Headline - the title of the article
     * Summary - a short summary of the article
     * URL - the url to the original article
     * ***Add additional scraped content here***

  2. Each scraped article will be saved to a database associated with the application.

  4. Users are able to leave comments on the articles displayed and revisit them later.
  5. These comments are saved to the database as well (in addition to the articles) and they are associated with their respective articles.
  6. Users can also delete comments left on articles.
  7. All stored comments are visible to every user.

### Assistant Links

* [MongoDB Documentation](https://docs.mongodb.com/manual/)
* [Mongoose Documentation](http://mongoosejs.com/docs/api.html)
* [Cheerio Documentation](https://github.com/cheeriojs/cheerio)
