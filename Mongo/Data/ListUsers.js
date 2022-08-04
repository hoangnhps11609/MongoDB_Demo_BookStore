var userList = [{
    "user_name" : "list1",
    "password" : NumberInt(123456),
    "email" : "unit@gmail.com",
    "hobbies" : ["running", "money"],
    "status" : "active",
    "age": 20,
    "speaking": {
        "english": 6,
        "japanese": 8,
        "korea": 7
    }
},
{
    "user_name" : "list2",
    "password" : NumberInt(123456),
    "email" : "unit@gmail.com",
    "hobbies" : ["running", "game"],
    "status" : "active",
    "age": 30,
    "speaking": {
        "english": 2,
        "japanese": 3,
        "korea": 4
    }
},
{
    "user_name" : "list3",
    "password" : NumberInt(123456),
    "email" : "unit@gmail.com",
    "hobbies" : ["running", "money"],
    "status" : "active",
    "age": 45,
    "speaking": {
        "english": 10,
        "japanese": 10,
        "korea": 10
    }
}];

db.users.insert(userList);