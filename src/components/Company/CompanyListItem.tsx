import React from 'react'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const CompanyListItem: React.FC = () => {
  return (
    <div>
      <ListItem>
        <ListItemText
          primary="株式会社nono"
        />
      </ListItem>
    </div>
  )
}

export default CompanyListItem
