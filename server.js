require('dotenv').config();
const express = require('express');

//pulls in username and password from .env
//note that naming convention is all caps for .env variables
const user = process.env.USER
const password = process.env.PASSWORD