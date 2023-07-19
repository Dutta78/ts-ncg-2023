// src/components/ViewList.js
import React, { useState, useEffect } from 'react';

const ViewList = ({ onDelete }) => {
  const [views, setViews] = useState([]);

  useEffect(() => {
    // Fetch views from the backend API and update the state
    // For simplicity, let's assume views are fetched from a REST API endpoint
    // and the response is an array of view objects containing the necessary data.
    // Example view object: { id, name, country, indicator, chartType, startDate, endDate, createdAt }

    // const response = await fetch('/api/views');
    // const views = await response.json();
    // setViews(views);

    // For the sake of this example, let's use a dummy data array
    const dummyViews = [
      { id: 1, name: 'View 1', country: 'US', indicator: 'GDP', chartType: 'Column', startDate: '2000', endDate: '2022', createdAt: '2023-07-19T12:34:56' },
      { id: 2, name: 'View 2', country: 'CN', indicator: 'POPULATION', chartType: 'Column', startDate: '2000', endDate: '2022', createdAt: '2023-07-18T09:10:11' },
      // Add more dummy data as needed
    ];

    setViews(dummyViews);
  }, []);

  const handleDelete = (viewId) => {
    // Make a REST service call to delete the view with the given viewId
    // For example: fetch(`/api/views/${viewId}`, { method: 'DELETE' });
    // Update the state after successful deletion to reflect the changes
    onDelete(viewId);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Indicator</th>
          <th>Chart Type</th>
          <th>Date Range</th>
          <th>Created Timestamp</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {views.map(view => (
          <tr key={view.id}>
            <td>{view.name}</td>
            <td>{view.country}</td>
            <td>{view.indicator}</td>
            <td>{view.chartType}</td>
            <td>{`${view.startDate} - ${view.endDate}`}</td>
            <td>{view.createdAt}</td>
            <td>
              <button onClick={() => handleDelete(view.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewList;
