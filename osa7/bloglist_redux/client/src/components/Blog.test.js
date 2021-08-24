import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import Blog from './Blog'


test('component only show author and title, not all info', () => {
  const blog = {
    author: 'Matti',
    title: 'Awsome Blog',
    url: 'www.blog.com',
    likes: '666'
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent(
    'Awsome Blog Matti'
  )
  expect(component.container).not.toHaveTextContent(
    'www.blog.com'
  )
  expect(component.container).not.toHaveTextContent(
    '666'
  )
})

test('component renders all info in blog when Show is clicked', () => {
  const blog = {
    author: 'Matti',
    title: 'Awsome Blog',
    url: 'www.blog.com',
    likes: '666',
    user: {
      name: 'Meikalainen'
    }
  }
  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('Show')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent(
    'Awsome Blog Matti'
  )
  expect(component.container).toHaveTextContent(
    'www.blog.com'
  )
  expect(component.container).toHaveTextContent(
    '666'
  )
  expect(component.container).toHaveTextContent(
    'Meikalainen'
  )
})

test('Like button clicked twice, props action handler is called twice', async() => {
  const blog = {
    id: '999',
    author: 'Matti',
    title: 'Awsome Blog',
    url: 'www.blog.com',
    likes: '666',
    user: {
      name: 'Meikalainen'
    }
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} handleLikeButton={mockHandler}/>
  )
  const showButton = component.getByText('Show')
  fireEvent.click(showButton)
  const likeButton = component.getByText('Like')
  await fireEvent.click(likeButton)
  await fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})