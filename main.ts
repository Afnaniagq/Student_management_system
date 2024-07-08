#! /usr/bin/env node 

//Import inquirer & chalk:

import inquirer from "inquirer";
import chalk from "chalk";

//Define the student class OR PARENT CLASS:
class student{
        static counter=10000; //static variable =value same for class & methods;
    id:number;
    name:string;
    courses:string[];
    balance:number;

  constructor(name:string){
    this.id=student.counter++;  //this. is use to access property;
    this.name=name;
    this.courses=[];
    this.balance=1000;    //default value
  }  
 //METHOD FOR ENROLL COURSE;

    enroll_course(courses:string){
    this.courses.push(courses)
     }
//METHOD FOR VIEW_BALANCE;
    view_balance(){
      console.log(chalk.yellow(`Balance of ${this.name} is : "${this.balance}"`));
    }
//Method FOR PAY_FEES;
    pay_fees(amount:number){

      if( amount > this.balance){
        console.log(chalk.red("Sorry you have 'Insufficient Balance'"))
       }
       else{
        this.balance -= amount
      console.log(chalk.yellow(` "${amount}" Fees paied sucessfully for "${this.name}" `));
       }
    }
     
//METHOD FOR SHOW STATUS;
    student_status(){
      console.log(chalk.green(`ID:"${this.id}"`));
      console.log(chalk.green(`NAME:"${this.name}"`));
      console.log(chalk.green(`COURSES:"${this.courses}"`));
      console.log(chalk.green(`BALANCE:"${this.balance}"`));
    }
}

          //************//
//2nd class :STUDENT MANAGEMENT CLASS OR CHILD CLASS;
class students_management{
  students:student[]   // TYPE "STUDENT" FROM PARENT CLASS;

  constructor(){
    this.students=[];
  }
  
//METHOD FOR ADD STUDENT;
    add_student(name:string){
        let stud =  new student(name); //ALL DATA STORE IN STUD VARAIABLE WHICH IS = TO STUDENT FROM PARENT CLASS:
        this.students.push(stud)
        console.log(chalk.yellow(`Student : ${name} added sucessfully!. Student ID: ${stud.id}`));
      }

//METHOD FOR ENROLL STUDENT IN COURSE;

    enroll_student(student_id:number, ecourse:string){
      let enroll_s= this.find_student(student_id);   //using thi.mehod with function of same class;
      if(enroll_s){
        enroll_s.enroll_course(ecourse); //method from parent class
        console.log(chalk.yellow(`"${enroll_s.name}" enrolled in "${ecourse}" course aucessfully!`));
      }
    }

//METHOD FOR VIEW STUDENT BALANCE;
    views_balance (student_id:number){
      let student= this.find_student(student_id);
      if(student){
        student.view_balance();
      }
      else{
        console.log("Student not found . Please enter a correct student ID ")
      }
    }
//METHOD FOR PAY_FEES:
    pays_fess (student_id:number,amount:number){
     let stud_fees =this. find_student(student_id)
     if(stud_fees){
      stud_fees.pay_fees(amount);
     }
     else{
      console.log("Student not found . Please enter a correct student ID ")
    }
    }
//METHOD TO DISPLAY STUDENT STATUS:
   students_status(student_id:number){
  let status=this. find_student(student_id)
  if(status){
    status.student_status();
  }
  else{
    console.log("Student not found . Please enter a correct student ID ")
  }
   }
//METHOD FOR FIND_STUDENT;
     find_student(student_id:number){
     return  this.students.find(stude => stude.id === student_id)   //.finf method for finding std id;
     }
}
        //################//

//#MAIN FUNCTION TO RUN PROGRAM:
async function main(){
  console.log(chalk.red("\n\tWELCOME TO STUDENT MANAGEMENT SYSTEM"));
  console.log(chalk.green("-".repeat(50)));

  let student_management= new students_management();  //WRITE "NEW" FOR CALLING CHILD_CLASS: 
  while(true){                                        //USING WHLE LOOP:
    let list =await inquirer.prompt([
      {
        name:"choice",
        type:"list",
        message:"Sellect an option",
        choices:["Add_student","Enroll_student","View_balance","Pay_fees","Students_status","Exit"]

      }
    ]);
 
             //# USING SWITCH CASES://#
  //CASE FOR "ADD STUDENT"
    switch(list.choice){
      case "Add_student":                          
        let add_input= await inquirer.prompt([
          {
            name:"name",
            type:"input",
            message:"Enter a student Name",
          }
        ]) ;
        student_management.add_student(add_input.name);
        break;    
  
  //CASE FOR "ENROLL STUDENT":      
      case   "Enroll_student":                
        let enroll_input = await inquirer.prompt([
          {
            name:"name",
            type:"number",
            message:"Enter student ID",
          },
          {
            name:"course",
            type:"input",
            message:"Enter a course name"
          }
        ]) ;
        student_management.enroll_student(enroll_input.name,enroll_input.course);
        break;

  //CASE FOR "VIEW BALANCE":    
        case "View_balance":
        let balance_input= await inquirer.prompt([
          {
            name:"student_ID",
            type:"number",
            message:"Enter a student ID",
          }
        ]) ;
        student_management. views_balance(balance_input.student_ID);
        break;    
        
   //CASE FOR PAY "FEES":    
        case "Pay_fees":
        let fees_input= await inquirer.prompt([
          {
            name:"student_ID",
            type:"number",
            message:"Enter a student ID",
          },
          {
            name:"amount",
            type:"number",
            message:"Enter fees Amount",
          }
        ]) ;
        student_management.pays_fess (fees_input.student_ID, fees_input.amount);
        break;    
 
  //CASE FOR "STUDENTS_STATUS":      
        case "Students_status":
        let status_input = await inquirer.prompt([
          {
            name:"status",
            type:"number",
            message:"enter student ID",
          }
        ]);
        student_management.students_status(status_input.status);
         break;

  //CASE FOR EXIT:       
         case "Exit":
          console.log(chalk.red("Exiting..."));
          process.exit()
    }
  }
}

//CALLING THE MAIN FUNCTION:
main();