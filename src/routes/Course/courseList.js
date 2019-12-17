import React from 'react';
import { shallow } from 'enzyme';
import CourseListPage from '../../pages/course/courseList/index'; // 引入组件

it('render courseList', () => {
  const wrapper = shallow(<CourseListPage/>); // 进行列表渲染
  expect(wrapper.find('CourseListPage').length).toBe(1);
  expect(wrapper.find('CourseListPage').prop('type')).toBe('success');
});
