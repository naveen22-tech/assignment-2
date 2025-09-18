import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: user.company?.name,
      address: `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`,
    });
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updated = {
        ...user,
        ...values,
        company: { name: values.company },
      };
      onSave(updated);
    } catch (err) {
      console.error("Validation failed:", err);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={!!user}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone"><Input /></Form.Item>
        <Form.Item name="website" label="Website"><Input /></Form.Item>
        <Form.Item name="company" label="Company"><Input /></Form.Item>
        <Form.Item name="address" label="Address"><Input.TextArea rows={2} /></Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
