// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
  // console.log('GET Request');
  //
  // axios({
  //   method:'get',
  //   //url: 'https://jsonplaceholder.typicode.com/todos?_limit=5' // one way to set limit by using "?_limit=5".
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params:{
  //     _limit:5
  //   }
  // })
  // // .then(res => console.log(res))
  // .then(res => showOutput(res))
  // .catch(err => console.log(err));
  //
  //above method is long way to to it there is another way short and simple
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5',{timeout:5000})
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}
 
// POST REQUEST
function addTodo() {
  // console.log('POST Request');
  // axios({
  //   method:'post',
  //   //url: 'https://jsonplaceholder.typicode.com/todos?_limit=5' // one way to set limit by using "?_limit=5".
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   data: {
  //     title: "New Todo",
  //     completed: false
  //   }
  // })
  // // .then(res => console.log(res))
  // .then(res => showOutput(res))
  // .catch(err => console.log(err));
  //above method is long way to to it there is another way short and simple
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    titlt:'New Todo',
    completed:false
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log('PUT/PATCH Request');
  //
  //Put request
  //
  // axios.put('https://jsonplaceholder.typicode.com/todos/1',{
  //   titlt:'Updated Todo', 
  //   completed:true
  // })
  // .then(res => showOutput(res))
  // .catch(err => console.log(err));
  //
  //patch request
  //
  axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
    title:'Updated Todo', 
    completed:true
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));

}

// DELETE REQUEST
function removeTodo() {
  //console.log('DELETE Request');
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  //console.log('Simultaneous Request');
  axios.all([
    todos = axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5',),
    posts = axios.get('https://jsonplaceholder.typicode.com/Posts?_limit=5',)
  ])
  // .then(res => {
  //   console.log(res[0]);
  //   console.log(res[1]);
  //   showOutput(res[1]);
  // })
  // another way using arrow function
  .then(axios.spread((todos,posts)=>showOutput(posts)))
  .catch(err => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  //console.log('Custom Headers');
  const config = {
    headers:{
      'Content-type':'application/jason',
      Authorization : 'sometoken',
    }
  }
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    titlt:'New Todo',
    completed:false
  },config)
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  //console.log('Transform Response');
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data : {
      title:'Hello world',
    },
    transformResponse: axios.defaults.transformResponse.concat(data =>{
      data.title = data.title.toUpperCase();
      return data;
    })
  }
  axios(options).then(res=>showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  //console.log('Error Handling');
  axios.get('https://jsonplaceholder.typicode.com/todoss',{
    validateStatus: function(status){
      return status<500; // reject only status is greter or equal to 500
    }
  })
  .then(res => showOutput(res))
  .catch(err => {
    if(err.response){
      // server responded with a status other than 200 range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }if(err.response.status === 404){
      alert('Error: Page Not Found');
    }else if (err.request){
      console.error(err.request);
    }else{
      console.error(err.massage);
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  //console.log('Cancel Token');
  const source = axios.CancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken: source.token
  })
  .then(res => showOutput(res))
  .catch(thrown =>{
    if(axios.isCancel(thrown)){
      console.log('Request Canceled', thrown.message);
    }
  });
  // if(true){
  //   source.cancel("Request Canceled!");
  // }
}

// INTERCEPTING REQUESTS & RESPONSES
// what this function do is every time we create request it give the detail of method in log
// basically we have litile loggor every time we make request
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`
    );
    return config
  },
  error => {
    return Promise.reject(error);
  }
)
// AXIOS INSTANCES
const axiosInstance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});

//axiosInstance.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);

//
//
//
//
/*
Why do we need headers any idea?

Ans: Headers are used for sending information you require every time you raise a request header automatically sends the information you don't have to mention those in the body, That's why we need headers.
*/

/*
What is axios?

Ans: Axios is a tool to communicate the front end to the servers. 

Axios is a library that lets developers make requests to either their own or a third-party server to fetch data.
*/
/*
What are the common problems faced when you make network calls and what should you do to solve it?

Ans: Common mistakes are the wrong URL, Endpoint expires, and payload 415 error. may be due to "stringify", mismatch match object names, and others.

what to do?

where we are working with network calls always keep open the network tab, check the base URL, and route. check to whether its working in postman or not, if not then check your code and URL.
*/
