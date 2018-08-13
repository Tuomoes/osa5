import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'
import Togglable from './components/Togglable'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: [],
            user: null,
            username: '',
            password: '',
            error: null
        }
    }

    componentDidMount() {
        const storedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (storedUserJSON) {
            const storedUser = JSON.parse(storedUserJSON)
            console.log('storedUser is:', storedUser)
            this.setState({user: storedUser})
            blogService.setToken(storedUser.token)
        }
        blogService.getAll().then(async blogs => {
            await this.setState({ blogs })
            console.log(this.state.blogs)
            console.log(this.state.blogs[0].user.name)
        })
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    login = async (event) => {
        event.preventDefault()
        console.log('Logging in with', this.state.username, this.state.password)
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })
            this.setState({username: '', password: '', user})
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            console.log('user from db is:', user)
            const localStorageUser = window.localStorage.getItem('loggedBlogappUser')
            console.log('user from local storage is', localStorageUser)
        } catch (exception) {
            console.log('invalid username and/or password')
            this.setState({ user: null, error: 'wrong username or password' })
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
        }

    }


    logout = (event) => {
        event.preventDefault() 
        console.log('Logging out', this.state.user.name)
        window.localStorage.removeItem('loggedBlogappUser')
        this.setState({user: null})

    }

    render() {
        if (this.state.user === null) {
            return (
                <div>
                    <Notification.Notification message={this.state.error} messageStyle="error-pop-up"/>
                    <h2>Login to application</h2>
                    <form>
                        <div>
                            username:
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleLoginFieldChange}
                            />
                        </div>
                        <div>
                            password:
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleLoginFieldChange}    
                            />
                        </div>
                        <button onClick={this.login}>Login</button>
                    </form>
                </div>
            )
        }
        return (
            <div>
                <h2>blogs</h2>
                <p>
                    {this.state.user.name + " logged in"} <button onClick={this.logout}>logout</button>
                </p>
                <Togglable.Togglable buttonLabel="create blog">
                    <BlogForm/>
                </Togglable.Togglable>
                {this.state.blogs.map(blog =>
                    <Blog key={blog._id} blog={blog} />
                )}
            </div>
        )
    }
}

export default App
