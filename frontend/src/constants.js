import {gql} from '@apollo/client'

export const GET_List = gql`
 query {
 list {
    id
    text
    completed
  }
 }
`

export const ADD_TASK = gql`
  mutation AddTask($id:ID, $text: String!) {
    addTask(id:$id, text: $text) {
      id
      text
      completed
    }
  }
`;

export const REMOVE_TASK = gql`
mutation RemoveTask($id:ID){
removeTask(id:$id){
 id
 text
 completed
}

}
`

export const TOGGLE_TASK = gql`
mutation ToggleTask($id:ID, $completed:Boolean){
  toggleTask(id:$id, completed: $completed){
  id
  text
  completed
  }
}`