import * as React from 'react'
import { autobind } from 'core-decorators'
import { Table, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import { ProblemStore } from '../stores'
import { RouteComponentProps } from 'react-router'

interface ITableColumn {
  title: string
  dataIndex?: string
  key: string
  render?: (...args: any[]) => JSX.Element
}
interface IHomeStateData {
  key: string
  name: string
  age: number
  address: string
}
interface IHomeInterface {
  columns: ITableColumn[]
  data: IHomeStateData[]
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/13689
interface IHomeProps extends RouteComponentProps<Home> {
  problemStore: ProblemStore
}

@inject('problemStore')
@observer
@autobind
export default class Home extends React.Component<IHomeProps, IHomeInterface> {

  public state: IHomeInterface = {
    columns: [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{ text }</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#">Action 一 { record.name }</a>
          <span className="ant-divider" />
          <a href="#">Delete</a>
          <span className="ant-divider" />
          <a href="#" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }],
    data: [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }]
  }

  render () {
    console.log(this.props.problemStore)
    return (
      <Table columns={ this.state.columns } dataSource={ this.state.data } />
    )
  }
}