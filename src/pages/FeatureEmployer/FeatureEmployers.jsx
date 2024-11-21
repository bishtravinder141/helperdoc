// src/components/Employers/Employers.tsx
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';

const employersData = [
  {
    id: 1,
    name: 'Company A',
    description: 'A leading company in the industry.',
    jobs: [
      { id: 101, title: 'Software Engineer', location: 'City X' },
      { id: 102, title: 'UX Designer', location: 'City Y' },
    ],
  },
  {
    id: 2,
    name: 'Company B',
    description: 'Innovative solutions for various sectors.',
    jobs: [
      { id: 201, title: 'Data Analyst', location: 'City Z' },
      { id: 202, title: 'Marketing Specialist', location: 'City W' },
    ],
  },
];

const FeatureEmployers = () => {
  return (
    <section className="employersSection">
      <Container className="employersContainer pageContainer">
        <Typography variant="h4">Featured Employers</Typography>
        <Grid container spacing={3}>
          {employersData.map((employer) => (
            <Grid key={employer.id} item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{employer.name}</Typography>
                  <Typography variant="body1">{employer.description}</Typography>
                  <Typography variant="subtitle1">Featured Jobs:</Typography>
                  <ul>
                    {employer.jobs.map((job) => (
                      <li key={job.id}>{`${job.title} - ${job.location}`}</li>
                    ))}
                  </ul>
                  <Button variant="outlined" href={`/employers/${employer.id}`}>
                    View Jobs
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default FeatureEmployers;
