import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';
import { Wrapper } from '../components/Wrapper';
import styled from 'styled-components';
import { Aside } from '../components/Aside';

const ArticleWrapper = styled.article`
    h1 {
        font-size: 48px;
        margin-bottom: 24px;
    }

    h2 {
        margin-bottom: 12px;
        margin-top: 24px;
    }

    p {
        font-size: 18px;
        line-height: 1.5;

        &:not(:last-child) {
            margin-bottom: 12px;
        }
    }
`;

const HeroImage = styled.img`
    width: 100%;
    border-radius: 12px;
    aspect-ratio: 16/4;
    object-fit: cover;
    margin-bottom: 12px;
`;

const Columns = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 24px;
    align-items: start;
`;

export const Article = () => {
    const params = useParams<{ slug: string }>();
    const location = useLocation();
    const { data } = useQuery(
        gql`
            query Article($slug: String) {
                article(slug: $slug) {
                    id
                    title
                    image
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
            <HeroImage src={data?.article.image} />
            <Columns>
                <ArticleWrapper>
                    <h1>{data?.article.title}</h1>
                    <h2 id="problem">The Problem</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In est tortor, mollis at leo a, fringilla tempor mi.
                        Etiam sed laoreet odio. Praesent et elementum nunc.
                        Aenean id massa ut nisi molestie faucibus. Fusce auctor
                        leo ligula, eget aliquam eros gravida at. Cras aliquam
                        enim vel velit fringilla, sit amet ultricies purus
                        laoreet. Nunc in lectus vitae leo accumsan cursus. Class
                        aptent taciti sociosqu ad litora torquent per conubia
                        nostra, per inceptos himenaeos. Donec vulputate ex nec
                        placerat rhoncus. Sed eleifend, diam ac laoreet
                        condimentum, tortor augue tempus augue, in fringilla
                        augue dolor eu nibh. Ut condimentum venenatis metus ac
                        tincidunt. Etiam nibh sapien, vehicula ut lorem ut,
                        convallis euismod velit. Donec euismod justo in arcu
                        volutpat, eu tempus tortor tempus. Aenean vel aliquam
                        orci. Donec in felis urna.
                    </p>
                    <h2 id="silly">Silly Anecdote</h2>
                    <p>
                        Vivamus quam sapien, pharetra vitae iaculis
                        sollicitudin, suscipit in libero. Cras lacinia ac lorem
                        eget ultrices. Praesent luctus ex quis aliquam egestas.
                        Aenean laoreet blandit tristique. Duis mollis urna vitae
                        velit bibendum blandit. Sed accumsan ligula sed nulla
                        efficitur, nec dapibus diam gravida. Donec neque leo,
                        mollis et arcu sed, vulputate malesuada metus. Donec ac
                        sapien egestas, volutpat magna vitae, iaculis urna.
                        Phasellus ultrices diam id consequat finibus. Aliquam
                        posuere elit a arcu lacinia, vitae facilisis odio
                        bibendum. In hac habitasse platea dictumst. Quisque est
                        orci, semper id mollis eget, pharetra a tellus.
                    </p>
                    <h2 id="quote">
                        Long-form Quote from an Infinitely Better Article
                    </h2>
                    <p>
                        Vivamus nec magna augue. Donec at ex eget nisi vulputate
                        maximus vitae ac urna. Sed placerat nisl quis mollis
                        venenatis. Aliquam erat volutpat. Aliquam in lobortis
                        nisl. Nunc congue nisi in nisi faucibus tristique.
                        Aliquam rutrum consectetur hendrerit.
                    </p>
                    <p>
                        Ut erat nibh, viverra at pharetra sit amet, sodales nec
                        felis. Pellentesque habitant morbi tristique senectus et
                        netus et malesuada fames ac turpis egestas. Nulla
                        vulputate pellentesque turpis vehicula luctus. Morbi non
                        pharetra nulla. Aliquam luctus eleifend diam, sed
                        aliquet nulla. Vestibulum ac tortor quis ante tincidunt
                        consequat. Nam non arcu et eros venenatis mollis quis
                        non elit. Duis consequat neque enim. Integer iaculis,
                        ligula vitae dictum imperdiet, neque velit congue arcu,
                        eu sollicitudin ante metus eget est. Nullam ut magna
                        quis tellus hendrerit placerat vel sed quam.
                    </p>
                    <h2 id="conclusion">
                        Conclusion that You Didn't Need Me to Tell You
                    </h2>
                    <p>
                        In bibendum ante quis rhoncus vehicula. Quisque
                        hendrerit ullamcorper erat, imperdiet mollis sem
                        malesuada ac. Aliquam fermentum ipsum at quam fringilla
                        pretium. Sed congue risus viverra dui aliquet semper.
                        Curabitur vel nibh non massa lobortis cursus in eu
                        metus. Quisque non ex facilisis, semper eros et,
                        dignissim urna. Fusce tristique sodales lorem eu
                        faucibus. In pretium bibendum euismod. Nam porttitor
                        nunc tellus, non efficitur nisi fringilla eget. Fusce
                        nulla nisl, cursus a sapien non, ullamcorper porta elit.
                        Cras feugiat faucibus pulvinar. Nulla vitae lorem
                        vehicula, dictum lorem eu, cursus neque. Vestibulum
                        scelerisque lacinia ex, quis egestas ligula tempor non.
                        Vivamus nisl ipsum, porta a lorem ut, convallis porta
                        nunc. Etiam accumsan risus eget nisi efficitur
                        ultricies.
                    </p>
                    <p>
                        Praesent urna tellus, tempus quis fermentum eget,
                        vulputate vel dui. Donec quis sapien pretium dolor
                        tincidunt aliquet et sit amet augue. Nullam congue
                        commodo ultricies. Ut porttitor ante et justo
                        sollicitudin malesuada. Nullam libero erat, feugiat.
                    </p>
                </ArticleWrapper>
                <Aside id={data?.article.id}>
                    <h2>Table of Contents</h2>
                    <ul>
                        <li>
                            <a href={`${location.pathname}#problem`}>
                                The Problem
                            </a>
                        </li>
                        <li>
                            <a href={`${location.pathname}#silly`}>
                                Silly Anecdote
                            </a>
                        </li>
                        <li>
                            <a href={`${location.pathname}#quote`}>
                                Long-form Quote from an Infinitely Better
                                Article
                            </a>
                        </li>
                        <li>
                            <a href={`${location.pathname}#conclusion`}>
                                Conclusion that You Didn't Need Me to Tell You
                            </a>
                        </li>
                    </ul>
                </Aside>
            </Columns>
        </Wrapper>
    );
};
