
### Goals
1. functional face login
* Description.
    1. first object detection but also offers option of username and password.
        * **log** to check both user name and password we need to have a conetion to the sql database

        1. page loads the names off all the faces in files (this is required for the labeling in the facerecognition script)
        the facerecognition script needs to recieve this as a list
        2. if face is recognized it checks against database if exists either acceses account or asks for password
        3. after a while is tells you that you are not authorized
        
        **future develpment** the face recognition uses a triger , smile or sad , before recognizing, might make the whole thing faster
        
    2. signup page accepts two pictures as maximum
    *  Description.
        1. works using a form that send the stuff thru a GET method
        2. the get method also adds the user to the database
       
        **future develpment** you can directly upload pictures from the webcam

    3. signup offers the option to take picture to download (uploading the picture directly to the file proved difult, form doesnt accept automatic submition)
    4. should look pretty

2. add the assistant functionality
3. machine learning predictin

##=====================================================================

mvc paradigm
orm

.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── burger_style.css
│       └── img
│           └── burger.png
│   
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars


