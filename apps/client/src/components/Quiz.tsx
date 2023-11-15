import React, {useCallback} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import styled from 'styled-components';

import { QuizItem } from './QuizItem';
import {useUser} from "../providers/Auth";

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
    const userId = useUser()?.id;
    const { data, refetch} = useQuery(
        gql`
            query Quiz($id: ID!, $userId: ID!) {
                quizById(id: $id) {
                    id
                    title
                    questions {
                        id
                        questionText
                        progress(userId: $userId) {
                            completedTimestamp
                        }
                    }
                }
            }
        `,
        {
            variables: {
                id,
                userId,
            },
        }
    );
    const markQuestionComplete = useMarkQuestionComplete();

    const onSelect = async (id) => {
        //pretty simplistic approach to marking a question complete, but i wanted to keep it simple and have
        //some sort of interaction that works
        await markQuestionComplete(id);
        refetch()
    };
    return (
        <QuizContainer id="quiz">
            <h2>{data?.quizById.title}</h2>
            <div>
                {data?.quizById.questions.map((question, idx) => (

                    <QuizItem
                        key={question.id}
                        selected={!!question.progress?.completedTimestamp}
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

function useMarkQuestionComplete() {
    const userId = useUser()?.id;
    const [markQuestionComplete] = useMutation(gql`
        mutation MarkQuestionComplete($input: UpdateProgressInput!) {
            saveProgress(input: $input) {
                completedTimestamp
            }
        }
    `);
    return useCallback(async (questionId: string) => {
        try {
            const input = {
                userId,
                contentId: questionId,
                completedTimestamp: new Date().valueOf(),
            };
            await markQuestionComplete({ variables: { input } });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }, [markQuestionComplete, userId,]);

}
