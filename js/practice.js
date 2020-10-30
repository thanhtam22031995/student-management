// scope

// Global scope (hạn chế sử dụng)
// function scope: phạm vi trong function
// - Block scope: phạm vi trong cặp {}
// - lexical scope: định nghĩa hàm bên trong có thẻ truy xuất biến của hàm bên ngoài

function hello() {
  const name = 'Hậu';

  // lexical scope
  function subHello() {
    console.log(name);
  }

  subHello();

  {
    // block
  }
}

// closure
// This in Javascript
/*
'this' là tham chiếu tới object cha chưa cái hàm đang đc gọi

'this' 
 */

// const student = {
//   name: 'Hau',
//   sayHello() {
//     console.log('Hi from', this.name);
//   },
// };
// student.sayHello();

// ---

const student = {
  name: 'Hau',
};

function sayHello(age, gender) {
  console.log('Hi from', this.name, age, gender);
}

const studentSayHello = sayHello.bind(student);

studentSayHello(18, 'Male');

// bind() tạo ra hàm mới nhưng chưa đc thực thi, khi nào cần thì gọi
// nếu muốn thục thi luôn thì dùng call and apply
// call()
// apply()

sayHello.call(student, 18, 'Female');
sayHello.apply(student, [20, 'male']);

// đối với arrow function thì ko bind đc, luôn luôn lấy object cha, lexical this

const student = {
  name: 'Hau',
};

const sayHello = (age, gender) => {
  console.log('Hi from', this.name, age, gender);
};

const studentSayHello = sayHello.bind(student);

studentSayHello(18, 'Male');
sayHello.call(student, 18, 'Female');
sayHello.apply(student, [20, 'male']);
