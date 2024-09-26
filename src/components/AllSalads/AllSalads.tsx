import React from 'react';
import './all-salads.scss'
import SaladCard from "../SaladCard/SaladCard.tsx";

function AllSalads() {
    return (
        <main className='salads-menu'>
            <h2 className='salads-menu__title'>All Salads</h2>

            <ul className='salads-menu__list'>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
                <SaladCard/>
            </ul>
        </main>
    );
}

export default AllSalads;