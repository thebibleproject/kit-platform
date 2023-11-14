import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

import { Wrapper } from '../components/Wrapper';
import { Card } from '../components/Card';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 48px;
    margin: 16px 0 56px;
`;

export const Home = () => {
    const { data, loading } = useQuery(gql`
        query AllContent {
            articles {
                id
                title
                image
                slug
                description
            }
            videos {
                id
                title
                description
                slug
                image
            }
            quizzes {
                id
                title
            }
        }
    `);

    return loading ? (
        <div>Loading...</div>
    ) : (
        <Wrapper>
            <h2>Articles</h2>
            <Grid>
                {data.articles.map((article) => (
                    <Card {...article} type="article" key={article.id} />
                ))}
            </Grid>
            <h2>Videos</h2>
            <Grid>
                {data.videos.map((video) => (
                    <Card {...video} type="video" key={video.id} />
                ))}
            </Grid>
        </Wrapper>
    );
};
