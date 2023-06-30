# PitputitAndroid - Server

This program is a server for the Android project Pitputit.
You must run it `before` you run the Android client - 

```
https://github.com/nshakedsl/Pitputit3.git
```

## Cloning and Running Instructions:

### 1. Create a database using MongoDB.
- using MongoDB Compass are provided below (you can use also Mongosh):
- Ensure that the MongoDB Compass application is installed.
- Open the downloaded application and note the following message via the default URI:
```
    mongodb://localhost:27017
```

- Click the connect button.


### 2. To clone the repository, follow these steps:

In the terminal, navigate to the directory where you want to clone the repository.

Enter the following command:
```
clone https://github.com/nshakedsl/pitputitServer.git
```


### 3. create env file: 
- create `.env.local` file 
- put the file into `server/config/` directory. 
- fill the file by writing the following data:
- `CONNECTION_STRING`- Login details 
- `PORT` - The port you want to run on  it.
- `SECRET_KEY` - A random string

#### For example:

```
CONNECTION_STRING="mongodb://localhost:27017/Pitputit"
PORT=8080
SECRET_KEY="_______"
```

### 4. To run the program:

- To run the project- open the terminal by the current folder:

-Install the libraries:
 ```
 npm i
 ```
- And run it by:
```
npm start
```

- If you are on linux run it by:
```
npm start linux
```
- Navigate in the browser to Open [http://localhost:8080](http://localhost:8080) to view it in your browser.


- To complete the setup process, all that remains is to run the client and indulge in our application. 😊
complete the instructions in the following link. 

```
https://github.com/nshakedsl/Pitputit3.git
```


## Authors:

1. Shaked Solomon
2. Ofir Gurvits
3. Naama Matzliach
