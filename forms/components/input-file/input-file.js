import React from 'react'
import styled from 'styled-components'
import { FlexItem } from '../flex';
import { FormLabel, FaintLabel } from '../styles/font-styles';
import FakeLink from '../fake-link'


function random (min, max, round = true){
  const num = Math.random() * (max - min + 1) + min
  return round ? Math.floor(num) : num
}

function pickRandom(arr){
  const num = random(0, arr.length - 1)
  return arr[num]
}

const filenames = [
  'test-documents.pdf',
  'test-file-no-1.pdf',
  'new-document.pdf',
  'info.txt'
]

const UploadedFileWrapper = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  border-top: solid 1px;
  border-bottom: solid 1px;
  opacity: ${props => props.loading ? 0.5 : 1};
  transition: opacity 0.6s;
` 

const AddFile = styled.div`
  display: flex;
  vertical-align: center;
  background: grey;
  padding: 1rem 0.5rem;
`

const UploadedFile = props => {
  const {file} = props
  return (
    <UploadedFileWrapper loading={props.loading}>
      <div>
        <FormLabel>{file.name}</FormLabel>
        <FaintLabel>{file.filename}</FaintLabel>
      </div>
      <FlexItem right>
        <FakeLink>view file</FakeLink>
      </FlexItem>
      <div onClick={props.removeItem}>
        trash
      </div>
    </UploadedFileWrapper>
  )
}

class FileInput extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      items: []
    }

    this.index = 0
  }

  addItem = () => {
    const item = {
      name: `${this.props.type || this.props.name} ${this.index++}`,
      filename: pickRandom(filenames),
      loading: true
    }
    this.setState(prevState => {
      return { 
        items: [
          ...prevState.items,
          item
        ]
      }
    }, async () => {
      this.changeEvent()
      
      await wait(random(2, 5) * 1000)

      this.updateItem(item.name, { loading: false })

      this.changeEvent()
    })
  }

  updateItem (name, update) {
    this.setState(state => {
      let key = state.items.findIndex(x => x.name === name)
      let item = state.items[key]
      item = {
        ...item,
        ...update
      }

      return {
        items: splice(state.items, key, 1, item)
      }
    })
  }

  changeEvent = () => {
    if (this.props.onChange) {
      const customEvent = {
        target: {
          value: this.state.items,
          name: this.props.name
        }
      }

      this.props.onChange(customEvent)
    }
  }

  removeItem = name => {
    this.setState(state => {
      return {
        items: state.items.filter(file => file.name !== name)
      }
    }, () => {
      this.changeEvent()
    })
  }

  render(){
    const {items} = this.state
    return (
      <div>
        {
          Object.entries(items)
          .map(
            ([key, file]) => <UploadedFile key={key} loading={file.loading} file={file} removeItem={() => this.removeItem(file.name)}/>
          )
        }
        <AddFile>
          <FakeLink onClick={this.addItem}>+ add Another File</FakeLink>
          <FlexItem right>
            <input type="file" onClick={e => {
              e.preventDefault()
              this.addItem()
            }}/>
          </FlexItem>
        </AddFile>
      </div>
    )
  }
}

function splice(arr, ...args){
  let result = [...arr]
  result.splice(...args)
  return result
}

function wait(time){
  return new Promise(resolve => setTimeout(resolve, time))
}

export default FileInput