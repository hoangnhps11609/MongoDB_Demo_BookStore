

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////RUN TRONG TERMINAL
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

///////Import - export file JSON
mongoimport -d <database_name> -c <collection_name> --file <file_src>
mongoexport -d <database_name> -c <collection_name> -o <pathname>



///////Import - export file CSV
mongoimport -d <database_name> -c <collection_name> --type = csv --file <file_src> --headline
mongoexport -d <database_name> -c <collection_name> --type = csv -o <pathname> -f <field1, field2, field3>



///////Import - Export Database
//C1: file folder bình thường 
mongodump -d <database_name> -o <path_name>
mongorestore -d <database_name> <path_name>

//C2: file gzip 
mongodump -d <database_name> -o <path_name> --gzip
mongorestore -d <database_name> <path_name> --gzip

//C3: file gzip tại thư mục hiện tại 
mongodump -d <database_name> --gzip --archieve=<name_gzip>
mongorestore -d <database_name> --gzip --archieve=<name_gzip>











/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////RUN TRONG MONGOSH 
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

//Sử dụng mongohd
mongosh

//xem database hiện có 
dbs

// sử dụng database, nếu chưa tồn tại thì tạo mới 
use <database_name>

//tạo collection cho database đang sử dụng 
db.createCollection("collection_name")

//xem các collections cuar database đang sử dụng 
show collections

//xoá database đang sử dụng 
db.dropDatabase()


////////Load file JSON
load("path_name")


//Insert document mới 
try {
  db.users.insert(
    { "user_name" : "admin", "password: 122344" }
  );
} catch (e) {
  print(e);
}


//Update 1 Object có user_name: admin, cập nhật id = 5, 
//upsert nếu kiếm ko thấy insert cái mới, mutil update tất 
try {
  db.users.updateOne(
    { "user_name" : "admin" },
    { $set: {"id" : 5} },
    { upsert: true,
      mutil: false }
  );
} catch (e) {
  print(e);
}


//Update: điều kiện id trống, update id = 5, upsert insert nếu tìm ko thấy,
//mutil cập nhật tất cả  
try {
  db.users.updateOne(
    { "id" : {$exists: false}},
    { $set: {"id" : 5}},
    { upsert: true,
      mutil: false }
  );
} catch (e) {
  print(e);
}


//xoá field id trong collection, $upset: xoá field 
try {
  db.users.updateMany(
    {},
    { $unset: {"id": ""}},
    { upsert: false}
  );
} catch (e) {
  print(e);
}


//Xoá: điều kiện user_name = Hoang 
try {
   db.users.deleteOne( 
   { "user_name" : "hoang" } 
   );
} catch (e) {
   print(e);
}


//Xoá: điều kiện có hobbies trống, $eq: so sánh bằng 
try {
   db.users.deleteOne( 
   { "hobbies" : {$eq: ""} } 
   );
} catch (e) {
   print(e);
}


//Xoá: Điều kiện tuổi 20-35 
try {
   db.users.deleteOne( 
   { "age" : {$gt: 20}, "age": {$lt: 35} } 
   );
} catch (e) {
   print(e);
}


//Xoá:Điều kiện Hobiies có game và travel 
try {
   db.users.deleteOne( 
   {"hobbies": {$in:["game", "travel"]} } 
   );
} catch (e) {
   print(e);
}


//Tìm: tất cả và đếm 
try {
   db.users.find().count()
} catch (e) {
   print(e);
}


//Tìm: Điều kiện _id 
try {
   db.users.find({"_id": ObjectId("62ea1ab5eee431bcb798a479")})
} catch (e) {
   print(e);
}


// Tìm: Điều kiện user_name = list1, chỉ xem (1) các field user_name, password, ẩn(0) _id 
try {
   db.users.find({"user_name": "list1"}, {"user_name": 1, "password": 1, "_id": 0})
} catch (e) {
   print(e);
}


//Tìm: tất cả, hiện user_name password, ẩn _id. Lấy 4 kết quả từ vị trí thứ 3 
try {
   db.users.find({}, {"user_name": 1, "password": 1, "_id": 0}).limit(4).skip(3)
} catch (e) {
   print(e);
}


//Tìm: điều kiện nằm trong mảng _id cho trước 
try {
   db.users.find({"_id": {$in: [ObjectId("62ea1ab5eee431bcb798a479"), ObjectId("62ea1ab5eee431bcb798a47a")]}})
} catch (e) {
   print(e);
}
 
 
//Tìm: điều kiện 15-35 
try {
   db.users.find(
       {"age": {$gt: 15, $lt:35}}
   )
} catch (e) {
   print(e);
}


//Tìm tuổi bằng 20 
try {
   db.users.find(
       {"age": 20}
   )
} catch (e) {
   print(e);
}


// tìm speaking english = 10 
try {
   db.users.find(
       {"speaking.english": 10}
   )
} catch (e) {
   print(e);
}


//Tìm speaking english 6<=x<=8 
try {
   db.users.find(
       {"speaking.english": {$gte:6, $lte: 8}}
   )
} catch (e) {
   print(e);
}


//Tìm điều kiện hobbies không chứa game 
try {
   db.users.find(
       {"hobbies": {$ne: "game"}}
   )
} catch (e) {
   print(e);
}


//Tìm điều kiện hobbies có game hoặc money 
try {
   db.users.find(
       {"hobbies": {$in: ["game", "money"]}}
   )
} catch (e) {
   print(e);
}


//Tìm điều kiện englist > 6 hoặc japanese  <=10 
try {
   db.users.find(
       {$or: [
               {"speaking.english": {$gt: 6}},
               {"speaking.japanese" : {$lte: 10}}    
           ]
       }
   )
} catch (e) {
   print(e);
}


// tìm điều kiện english > 6 và japanese <= 10 
try {
   db.users.find(
       {$and: [
               {"speaking.english": {$gt: 6}},
               {"speaking.japanese" : {$lte: 10}}    
           ]
       }
   )
} catch (e) {
   print(e);
}


// tìm english không lớn hơn 6 và sort theo tuổi giảm dần (-1)
try {
   db.users.find(
       {"speaking.english": {$not: {$gt: 6}}}     
   ).sort({"age": -1})
} catch (e) {
   print(e);
}


// tìm english không lớn hơn 6 và sort tuổi giảm dần và english tăng dần 
try {
   db.users.find(
       {"speaking.english": {$not: {$gt: 6}}}     
   ).sort({"age": -1, "speaking.english": 1})
} catch (e) {
   print(e);
}


// tìm điều kiện pop bé hơn 4546 và sắp xếp pop giảm dần 
try {
   db.demo.find({"pop": {$lt: 4546}}).sort({"pop": -1})
} catch (e) {
   print(e);
}
//
//
///
//
//
//
//
/////Single Field Indexes: gắn chỉ số cho 1 field 
//Xem hiệu năng của câu truy vấn 
try {
   db.demo.find({"pop": 4546 }).explain("executionStats")
} catch (e) {
   print(e);
}


// đánh chỉ số cho field pop (tự động gh field pop như id sắp xếp theo tăng dần
// khi thực hiện query trên field pop sẽ tìm kiếm theo dạng băm giúp tăng tốc độ 
try {
   db.demo.createIndex({"pop": 1})
} catch (e) {
   print(e);
}


//xem chỉ số 
try {
   db.demo.getIndexes()
} catch (e) {
   print(e);
}


//xoá chỉ số 
try {
   db.demo.dropIndex(pop_1")
} catch (e) {
   print(e);
}



/////
////
///
//
///Compound Indexes gắn chỉ số cho nhiều field  
//tạo hỗn hợp 2 chỉ số cho pop và state 
db.demo.createIndex({state:1, pop: 1})

try {
   db.demo.find({"state": "MA", "pop": {$lte:21905}})
   .sort({"pop": -1})
   .limit(30).skip(30)
   .explain("executionStats")
} catch (e) {
   print(e);
}



///////
/////
////
///
// Unique Indexes: gắn chỉ số cho field có value không được trùng 
//Unique: set user_id không được trùng (true)
db.users.createIndex({"user_id" : 1},{unique: true})



///////
//////
/////
////
///
//Sparse Indexes: loại bỏ các field rỗng
//cách 1: làm bình thường, không gắn chỉ 
try {
   db.users.find(
       {"department": {$exists: true}}
   ).sort({"department": 1})
} catch (e) {
   print(e);
}


//gắn chỉ số cho department, sparse set có lấy field rỗng hay không 
db.users.createIndex({"department" : 1}, {sparse: true})

//cách 2: sử dụng chỉ số 
try {
   db.users.find().sort({"department": 1}).hint({"department": 1})
} catch (e) {
   print(e);
}



///////
//////
/////
////
///
// TTL Indexes (Time to Live): tự động xoá sau khoảng thời gian được set trong indexes 
//gắn chỉ số cho field created_Date, sắp xếp tăng dần, những documents nào field created_Date không rỗng sẽ xoá sau 20s set indexes.
//chỉ sử dụng được cho field Date 
db.users.createIndex({"created_Date": 1}, {"expireAfterSeconds": 20})


///////
//////
/////
////
///
// (Quan trọng) Text Indexes 

try {
    db.users.createIndex(
        {
            user_name: "text",
            email: "text",
            hobbies: "text",
            biography: "text"
        },
        {
            name: "searchText",
            default_language: "none"
        }
    ) 
} catch (e) {
   print(e);
}


db.users.find(
    {$text: {$search: "fishing gaming list3"}}
)


db.users.find(
    {$text: {$search: "fishing list1 -\"traveling\""}}
)


db.users.find(
    {$text: {$search: "lập trình viên "}}
)

db.users.find(
    {$text: {$search: "\"lập trình viên\" "}}
)

db.users.find(
    {$text: {$search: "\"lập trình viên\" -\"Sài Gòn\""}}
)


db.users.find(
    {$text: {$search: "SàI", $caseSensitive: true}}
)


////////
///////
//////
/////
////
///Partial Indexes($exists, $gt, $gte, $lt, $lte, $type, $and)
//
db.restaurants.find(
    {
        "grades": {
            $elemMatch: {
                grade: "A", 
                score: 7,
                date: {
                    $gte: new Date(2014,1,1), $lte: new Date(2015,1,1)
                }
            }
        }
    }
)


db.restaurants.createIndex(
    {"cuisine": 1},
    {partialFilterExpression: 
        {"borough": 
            {$eq: "Bronx"}"
        }
    }
)


//////
/////
////
///Fnd and Regex
//chỉ sử dụng tốt cho String
db.restaurants.find(
    {
        "cuisine": {$regex: /^Ame[a-z]+ic[a-z]n$/}
    }
)