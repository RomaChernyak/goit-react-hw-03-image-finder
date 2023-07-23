import React, { Component } from "react";
import Notiflix from "notiflix";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";

export class Searchbar extends Component {
    handleQueryChange = event => {
        this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    };

    handleFormSubmit = evt => {
        evt.preventDefault();
        // console.log(evt);
        // console.log(this.props);
        // console.log(evt.currentTarget.elements);

        const { value } = evt.currentTarget.elements[1];
        const { handleSubmit } = this.props;
        const regex = /^[a-zA-Z0-9]+$/;
        
        if (!regex.test(value)) {
            return Notiflix.Notify.failure("The input value should contain only letters and digits!");
        }

        value === ''
            ? Notiflix.Notify.failure("Please try again. Enter a search term in the search field.")
            : handleSubmit(value.toLowerCase().trim());
        
        evt.currentTarget.reset();
    };

    // handleSubmit = event => {
    //     event.preventDefault();
    //     if (this.state.searchQuery.trim() === '') {
    //     toast.error('Enter a keyword');
    //     return;
    //     }
    //     this.props.onSubmit(this.state.searchQuery);
    //     this.setState({ searchQuery: '' });
    // };

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.searchform} onSubmit={this.handleFormSubmit}>
                    <button type="submit" className={css.button}>
                        <FaSearch size={24} />
                    </button>

                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        name="search"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
};

Searchbar.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};