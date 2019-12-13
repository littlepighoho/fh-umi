import { Icon, Tag } from 'antd';
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './index.less';

const { CheckableTag } = Tag;

const TagSelectOption = ({ children, checked, onChange, value }) => (
  <CheckableTag
    checked={!!checked}
    key={value}
    onChange={state => onChange && onChange(value, state)}
  >
    {children}
  </CheckableTag>
);

TagSelectOption.isTagSelectOption = true;

class TagSelect extends Component {
  static defaultProps = {
    hideCheckAll: false,
    actionsText: {
      expandText: '展开',
      collapseText: '收起',
      selectAllText: '全部',
    },
  };

  static Option = TagSelectOption;

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value || nextProps.defaultProps || [] ,
      };
    }

    return null;
  }

  state = {
    expand: false,
    value: ['student'],
  };

  onChange = value => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }

    if (onChange) {
      onChange(value);
    }
  };

  handleTagChange = (value, checked) => {
    const { value: StateValue } = this.state;
    let checkedTags = [...StateValue];
    const index = checkedTags.indexOf(value);
    if (checked && index === -1) {
      checkedTags = [value];
    }
    this.onChange(checkedTags);
  };


  isTagSelectOption = node =>
    node &&
    node.type &&
    (node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption');

  render() {
    const { value, expand } = this.state;
    const { children, hideCheckAll, className, style, expandable, actionsText = {} } = this.props;
    const cls = classNames(styles.tagSelect, className, {
      [styles.hasExpandTag]: expandable,
      [styles.expanded]: expand,
    });
    return (
      <div className={cls} style={style}>
        {console.log(this.state)}
        {value &&
          children &&
          React.Children.map(children, child => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                value: child.props.value,
                checked: value.indexOf(child.props.value) > -1,
                onChange: this.handleTagChange,
              });
            }
            return child;
          })}

      </div>
    );
  }
}

export default TagSelect;
