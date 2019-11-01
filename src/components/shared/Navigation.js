import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconStyle: {
        fontSize: "30px",
        marginLeft: "-8px"
      },
      collapsed: true
    };
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse(collapsed) {
    if (collapsed) {
      this.setState({
        iconStyle: { ...this.state.iconStyle, marginLeft: "-8px" },
        collapsed
      });
    } else {
      this.setState({
        iconStyle: { ...this.state.iconStyle, marginLeft: "3px" },
        collapsed
      });
    }
  }

  render() {
    const menuItemStyle = {
      display: "flex",
      alignItems: "center",
      height: "60px"
    };

    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu theme="dark" defaultSelectedKeys={[this.props.defaultKey]}>
          <Menu.Item key="1" style={menuItemStyle}>
            <Icon type="home" style={this.state.iconStyle} />
            <span style={{ paddingLeft: "3px" }}>Home</span>
          </Menu.Item>
          <Menu.Item key="2" style={menuItemStyle}>
            <Icon type="youtube" style={this.state.iconStyle} />
            <span style={{ paddingLeft: "3px" }}>Workspace</span>
          </Menu.Item>
          <Menu.Item key="3" style={menuItemStyle}>
            <Icon type="user" style={this.state.iconStyle} />
            <span style={{ paddingLeft: "3px" }}>My Info</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
