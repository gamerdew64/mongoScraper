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

* --- Please submit both the deployed Heroku link to your homework AND the link to the Github Repository! ---

## Application Breakdown

* This scraper application accomplishes the following:

  1. Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

  2. Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

### Assistant Links

* [MongoDB Documentation](https://docs.mongodb.com/manual/)
* [Mongoose Documentation](http://mongoosejs.com/docs/api.html)
* [Cheerio Documentation](https://github.com/cheeriojs/cheerio)
