import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import BlogForm from './BlogForm'


test('data is correct when submitting new blog and callback is called', () => {
  const createBlog = jest.fn()
  const user = {
    name: 'Matti'
  }
  const component = render(
    <BlogForm createBlog={createBlog} user={user} />
  )
  const form = component.container.querySelector('form')
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  fireEvent.change(titleInput, {
    target: { value: 'Awsome blog' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Matti' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'www.blog.com' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Awsome blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Matti')
  expect(createBlog.mock.calls[0][0].url).toBe('www.blog.com')
})