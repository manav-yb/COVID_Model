//Handling Promises

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("After 3 sec")
    }, 3000)
})

const promise1 = Promise.resolve(3)
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 3000)
})

//Untill all the promises doesn't get resolved .then method is not going to be called
Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values)
})
