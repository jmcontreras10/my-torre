# Social Torre

This is a basic project using the endpoints of torre to get some information about your network. The major part done was on backend, where using a Graph database system could be able to do some analytics like facebook or other social networks. A big oportunity for that is to navigate over users and find real interesting patterns on user connections.

#   Extra Notes:

I had to change the repositories in order to deploy easily using Heroku.
The application is available on: https://torre.mateocontreras.co/
The repositories will be available:

[ Back ] - https://github.com/jmcontreras10/my-torre-front
[ Front ] - https://github.com/jmcontreras10/my-torre-front


# Requirements

To run this front you'll need a .end file with:

MONGO_USER - Mongo instance User<br/>
MONGO_PASSWORD - Mongo instance password<br/>
MONGO_URL - Mongo instance url (just the path)<br/>
MONGO_DATABASE  - Mongo instance database<br/>
JWT_KEY - A secret key for the Auth encriptation<br/>


# Progress Log

| Day   | Hour          | Task                                                                                                                                                                                                                                                                  |
|-------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 24/01 | 12:02         | Reading carefuly the instructions                                                                                                                                                                                                                                     |
| 24/01 | 12:08         | Creating a postman collection and playing with it                                                                                                                                                                                                                     |
| 24/01 | 12:53         | I went to lunch                                                                                                                                                                                                                                                       |
| 24/01 | 14:05         | I started thinking for ideas and making some designs                                                                                                                                                                                                                  |
| 24/01 | 14:30         | I created the git repo and continue the brainstorming                                                                                                                                                                                                                 |
| 24/01 | 16:00         | Brainstorming looks like isn't working, I started creating the back project structure using basic MVC                                                                                                                                                                 |
| 24/01 | 16:10         | I create the mongo instance and configured the connector                                                                                                                                                                                                              |
| 24/01 | 16:12         | I started making the Auth Module (Bakend)                                                                                                                                                                                                                             |
| 24/01 | 17:00 - 14:20 | I got a break time                                                                                                                                                                                                                                                    |
| 24/01 | 20:00         | I finished most of Auth module in back (No more work for today). I had some issues with typescript so for time purposes I started using all in Javascript                                                                                                             |
| 25/01 | 8:00          | I started front today. I tried with Next.Js                                                                                                                                                                                                                           |
| 25/01 | 10:45         | I finished the bases of the Login screen and continue adding functionalities                                                                                                                                                                                          |
| 25/01 | 12:00         | Lunch time                                                                                                                                                                                                                                                            |
| 25/01 | 14:00         | I continue in front state management and Auth integrations (Some changes in back) and configuring CORS. In addition I used my backend as proxy for retrive info to front (because CORS)                                                                               |
| 25/01 | 15:30         | Next.JS started having issues to my app design, in addition I started learning about useContext and useReducer                                                                                                                                                        |
| 25/01 | 17:30         | I decided to use just React, so I migrated all in 30 minutes. The way in which Next is designed not allowed me to use in the way I learned useContext and useReduce Hooks                                                                                             |
| 25/01 | 18:15 - 18:30 | I had a break                                                                                                                                                                                                                                                         |
| 25/01 | 18:30         | Frustration starts comming, a clear idea about what will be about the app is not there. So i decided to finish working on code for now and start thinking.                                                                                                            |
| 25/01 | 20:13         | I had an idea about using a graph based algorithm like BFS and use it to retrieve the biographies and show to the user its related people. Finally I did some component diagrams in my notebook and how the graph must work.                                          |
| 25/01 | 21:20         | I stoped working, I was hungry                                                                                                                                                                                                                                        |
| 26/01 | 7:48          | I started midifiying the prject structure of the back. Fix some bugs on front.                                                                                                                                                                                        |
| 26/01 | 8:20          | I was finishing the auth integration. Hooray, I had at this moment a login/register functionality ready.                                                                                                                                                              |
| 26/01 | 10:40         | Being cool I decided to learn to use a Graph database. That allos me to save and search in a better way the users and their connections avoiding go over the Torre API again.                                                                                         |
| 26/01 | 12:50         | Lunch time                                                                                                                                                                                                                                                            |
| 26/01 | 14:00         | I continue learning about Neo4j after exploring a lot of possible Graph databases. I generated some queries on the online SDK and finally deployes an instance on my AWS EC2 instance. A lot security troubles, internet issues and SSL things made longer this part. |
| 26/01 | 17:06         | Finally the database fully worked and with node-backend connection. I started making queries and DAOs.                                                                                                                                                                |
| 26/01 | 18:20         | This is the greatest part of all. The big algorithm. I started thinking an designing the algorithm based on some BFS pseudocode to go over the people and it relarions with other people and organizations.                                                           |
| 27/01 | 0:19          | I finally finished and debugged the algorith using the visual representation of the Neo4j database. It worked fine, I was tired, so I went to bed.                                                                                                                    |
| 27/01 | 6:00          | I woke up early today. My mission was finish the Front to show at least some cards with the close people.                                                                                                                                                             |
| 27/01 | 8:00          | I went for some food                                                                                                                                                                                                                                                  |
| 27/01 | 8:05          | I continued working in the final endpoints to retrieve the relations to Front.                                                                                                                                                                                        |
| 27/01 | 8:30          | I continued solving bugs related to whole integration (from BD to Front)                                                                                                                                                                                              |
| 27/01 | 10:45         | I make some CSS changes in the login /register view and finished the bugs corrections.                                                                                                                                                                                |
| 27/01 | 11:20         | I built the Front and configure the backend ready to upload to Heroku                                                                                                                                                                                                 |
| 27/01 | 11:48         | I pushed the final commit of the code and started writting this log based on my notebook notes.                                                                                                                                                                       |
