import React from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Wrapper } from '../components/Wrapper';
import { Columns } from '../components/Columns';
import { Aside } from '../components/Aside';
import { QuizItem } from '../components/QuizItem';
import { Quiz } from '../components/Quiz';

const Frame = styled.iframe`
    width: 100%;
    aspect-ratio: 16/9;
`;

const Meta = styled.div`
    h1 {
        margin-bottom: 12px;
    }
`;

export const Video = () => {
    const params = useParams();
    const location = useLocation();
    const { data } = useQuery(
        gql`
            query Video($slug: String) {
                video(slug: $slug) {
                    id
                    title
                    image
                    youtubeId
                    description
                    quizId
                }
            }
        `,
        {
            variables: {
                slug: params.slug,
            },
        }
    );

    return (
        <Wrapper>
            <Frame
                src={`https://www.youtube.com/embed/${data?.video.youtubeId}`}
                title={data?.video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            ></Frame>
            <Columns>
                <Meta>
                    <h1>{data?.video.title}</h1>
                    <p>{data?.video.description}</p>
                    <Quiz id={data?.video.quizId} />
                </Meta>
                <Aside id={data?.video.id}>
                    <h2>Table of Contents</h2>
                    <ul>
                        <li>
                            <a href={`${location.pathname}#quiz`}>
                                Take the Quiz
                            </a>
                        </li>
                    </ul>
                </Aside>
            </Columns>
        </Wrapper>
    );
};
