import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'Sinuhe Blogi',
            author: 'Mika Waltari',
            likes: 262426
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
        const generalInfoDiv = simpleBlogComponent.find('.generalInfo')
        const likesInfoDiv = simpleBlogComponent.find('.likesInfo')

        console.log(likesInfoDiv)

        expect(generalInfoDiv.text()).toContain(blog.title)
        expect(generalInfoDiv.text()).toContain(blog.author)
        expect(likesInfoDiv.text()).toContain(blog.likes)
    })

})