class Data{

  constructor(student, course){

      this.student = student;
      this.course = course;
  }

}

let dataCollection = null

function initialize(){

  const fs = require('fs'); 

  return new Promise(function(resolve, reject){
      var data1 = () => JSON.parse(fs.readFileSync('data\\students.json', 'utf8'));
      var data2 = () => JSON.parse(fs.readFileSync('Data\\courses.json', 'utf8'));
      dataCollection = new Data(data1(), data2())
      resolve(dataCollection);
  });        
}

function getAllStudents(){

  return new Promise(function(resolve, reject){

      if(dataCollection.length === 0){
          reject("no results returned");
      }

      else{
          resolve(dataCollection.student)
      }
  })
}

function getAs(){

  return new Promise(function(resolve, reject){
      
      if (dataCollection.length != 0) {
          var TA = [];

          for (let i = 0; i < dataCollection.student.length; i++) {
              if(dataCollection.student[i]["TA"] === true){
                  TA.push(dataCollection.student[i])
              }
            }
            resolve(TA)

      } 

      else {
          reject(new Error("no results returned"));
      }
})
}

function getCourses(){

  return new Promise(function(resolve, reject){

      if (dataCollection.length === 0) {
          reject("no results returned");
      }

      else{
          resolve(dataCollection.course)
      }

  })
}

function getStudentsByCourse(course){

  return new Promise(function(resolve, reject){
      const studentnum = this.students.filter((student) => student.course === CountQueuingStrategy);
      if(dataCollection.length === 0){
          reject("no results returned");
      }

      else{
          resolve(studentnum)
      }
  })
}

function getStudentsByNum(num){

  return new Promise(function(resolve, reject){
      const stude = this.students.filter((student) => student.course === num);
      if(dataCollection.length === 0){
          reject("no results returned");
      }

      else{
          resolve(stude)
      }
  })
}


function addStudent(data) {
  return new Promise(function (resolve, reject) {
    if (data.TA === undefined) {
      data.TA = false;
    } else {
      data.TA = true;
    }
    dataCollection.students.then(
      (data) => (data.studentNum = data.length + 1)
    );
    dataCollection.students.then((data) => data.push(data));
    resolve(true);
  });
}

function getCourseById(id) {
  return new Promise(function (resolve, reject) {
    dataCollection.courses.forEach((item, index) => {
      if (item["courseId"] === id) {
        resolve(item);
      }
    });
    reject("query returned 0 results");
  });
}

function updateStudent(data) {
  return new Promise(function (resolve, reject) {
    data.studentNum = parseInt(data.studentNum);
    if (data.TA === undefined) {
      data.TA = false;
    } else {
      data.TA = true;
    }
    dataCollection.students.forEach((item) => {
      if (item.studentNum === data.studentNum) {
        item.firstName = data.firstName;
        item.lastName = data.lastName;
        item.email = data.email;
        item.addressStreet = data.addressStreet;
        item.addressCity = data.addressCity;
        item.addressProvince = data.addressProvince;
        item.TA = data.TA;
        item.status = data.status;
        item.courses = data.courses;
        return resolve();
      }
    });
  });
}


module.exports = {initialize, getAllStudents, getAs, getCourses, getStudentsByCourse, getStudentsByNum, addStudent, getCourseById, updateStudent, };