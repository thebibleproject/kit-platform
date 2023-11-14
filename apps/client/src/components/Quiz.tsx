import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

import { QuizItem } from './QuizItem';

const QuizContainer = styled.div`
    margin: 24px 0;
    max-width: 560px;

    h2 {
        margin-bottom: 12px;
    }

    div {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 8px;
    }
`;

export const Quiz = ({ id }) => {
    const { data } = useQuery(
        gql`
            query Quiz($id: ID!) {
                quizById(id: $id) {
                    id
                    title
                    questions {
                        id
                        questionText
                    }
                }
            }
        `,
        {
            variables: {
                id,
            },
        }
    );

    const onSelect = (id) => {
        console.log(id);
        // TODO: wire this up to Activity
    };

    return (
        <QuizContainer id="quiz">
            <h2>{data?.quizById.title}</h2>
            <div>
                {data?.quizById.questions.map((question, idx) => (
                    <QuizItem
                        index={idx}
                        question={question.questionText}
                        id={question.id}
                        onClick={onSelect}
                    />
                ))}
            </div>
        </QuizContainer>
    );
};
