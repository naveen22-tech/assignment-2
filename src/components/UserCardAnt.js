import React from "react";
import { Card, Button } from "antd";

const UserCardAnt = ({ user, onEdit }) => {
  const avatar = `https://avatars.dicebear.com/v2/avataaars/${encodeURIComponent(
    user.username
  )}.svg?options[mood][]=happy`;

  return (
    <Card
      hoverable
      cover={
        <img
          alt={user.username}
          src={avatar}
          style={{ height: "50%", objectFit: "cover", width: "100%" }}
        />
      }
      actions={[<Button type="link" onClick={onEdit}>Edit</Button>]}
    >
      <Card.Meta
        title={user.name}
        description={
          <div>
            <div><strong>{user.company?.name}</strong></div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>{user.address?.city}</div>
          </div>
        }
      />
    </Card>
  );
};

export default UserCardAnt;
