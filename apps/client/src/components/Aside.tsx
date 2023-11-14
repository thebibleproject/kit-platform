import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { CheckCircle } from '@phosphor-icons/react';

const AsideWrapper = styled.aside`
    width: 100%;
    border: 2px solid #efefef;
    border-radius: 8px;
    padding: 12px;

    ul {
        list-style: none;
        display: grid;
        grid-gap: 12px;
        font-weight: 600;
        font-size: 14px;
    }

    ul a {
        color: #c8c8c8;
    }

    ul a:hover {
        color: #fff;
    }

    h2 {
        font-size: 14px;
        margin: 0 0 8px;
        color: #ff009d;

        &:not(:first-child) {
            margin-top: 12px;
        }

        &::after {
            content: '';
            display: block;
            width: 149px;
            height: 2px;
            background: #686868;
            margin-top: 8px;
        }
    }
`;

const ActivityBar = styled.span`
    display: grid;
    grid-template-columns: minmax(0, max-content) 1fr;
    grid-gap: 8px;
    background: #00ce7a;
    color: #0c0c0e;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
`;

const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

export const Aside = ({ id, children }) => {
    // TODO: implement activity
    // const { data } = useQuery(`
    //   query Activity($id: ID!) {
    //      activity(id: $id) {
    //          id
    //          updatedAt
    //          createdAt
    //          content {
    //              id
    //              __typename
    //              ...on Video {
    //                  title
    //              }
    //              ...on Article {
    //                  title
    //              }
    //          }
    //      }
    //   }
    // `)
    // TODO: this is mock until we implement Activity service
    const data = {
        activity: {
            id: '123',
            createdAt: new Date(),
        },
    };

    const shouldShowActivity = Math.random() > 0.5;

    return (
        <AsideWrapper>
            {shouldShowActivity && (
                <ActivityBar>
                    <CheckCircle weight="bold" color="#0c0c0e" size={24} />
                    Completed on {formatter.format(data.activity.createdAt)}
                </ActivityBar>
            )}
            {children}
        </AsideWrapper>
    );
};
