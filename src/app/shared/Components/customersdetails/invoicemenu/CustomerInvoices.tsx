'use client'
import React from 'react';
import { Badge, Table } from "rizzui";



export default function CustomerInvoices() {
    return (
        <div>

<Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>ID</Table.Head>
          <Table.Head>Employee</Table.Head>
          <Table.Head>Designation</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>#12345</Table.Cell>
          <Table.Cell>John Doe</Table.Cell>
          <Table.Cell>FrontEnd Developer</Table.Cell>
          <Table.Cell>
            <Badge>Active</Badge>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>#12346</Table.Cell>
          <Table.Cell>Jane Smith</Table.Cell>
          <Table.Cell>UI/UX Designer</Table.Cell>
          <Table.Cell>
            <Badge>Active</Badge>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>#12347</Table.Cell>
          <Table.Cell>James Burns</Table.Cell>
          <Table.Cell>Project Manager</Table.Cell>
          <Table.Cell>
            <Badge>Active</Badge>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
            
            
        </div>
    );
}


