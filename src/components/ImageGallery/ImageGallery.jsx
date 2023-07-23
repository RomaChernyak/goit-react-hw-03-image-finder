import React, { Component } from "react";
import Notiflix from "notiflix";
import PropTypes from "prop-types";

import { fetchGalleryImg } from "../../Services/pixabay-api";
import { ImageGalleryItem, Loader, Button } from "components";
import css from "./ImageGallery.module.css";

export class ImageGallery extends Component {
    state = {
        isLoading: false,
        imageList: null,
        isBtnHidden: false,
        page: 1,
        error: null,
    };

    showErrorMessage = () => {
        Notiflix.Notify.failure("Unfortunately, there are no more images. You've reached the last page with search results.");
    };

    onFindMore = () => {
        this.setState(prevState => ({
            isLoading: true,
            page: prevState.page + 1,
            isBtnHidden: false,
        }));

        setTimeout(() => {
            const { page } = this.state;
            const { searchQuery } = this.props;
            
            fetchGalleryImg(searchQuery, page)
                .then(({ hits, totalHits }) => {
                    if (hits.length === 0) {
                        this.showErrorMessage();
                        this.setState({ isBtnHidden: true });
                    } else {
                        this.setState(prevState => ({
                            imageList: [...prevState.imageList, ...hits],
                        }));
                        // this.setState({ isBtnHidden: true });
                    };
                    
                    if ((page * 12) > totalHits) {
                        this.showErrorMessage();
                        this.setState({ isBtnHidden: true });
                    };
                })
                .catch(error => this.setState({ error }))
                .finally(() => this.setState({ isLoading: false }));
        });
    };

    componentDidUpdate(prevProps, prevState) {
        const { page } = this.state;
        const { searchQuery } = this.props;
        
        if (prevProps.searchQuery !== searchQuery) {
            this.setState({
                isLoading: true,
                imageList: null,
                page: 1,
                isBtnHidden: false
            });

            setTimeout(() => {
                fetchGalleryImg(searchQuery, page)
                .then(({ hits }) => {
                    if (hits.length === 0) {
                        this.showErrorMessage();
                    } else
                        this.setState({ imageList: hits });
                })
                .catch(error => this.setState({ error }))
                .finally(() => this.setState({ isLoading: false }));
            });
        }
    }
    
    render() {
        const { imageList, isBtnHidden, isLoading } = this.state;
        const { showModal } = this.props;
        
        return (
            <>
                {isLoading && <Loader />}

                {imageList && (
                    <ul className={css.gallery}>
                        {imageList.map(img => {
                            return (
                                <ImageGalleryItem
                                    showModal={() => showModal(img.largeImageURL)}
                                    key={img.id}
                                    smallImg={img.webformatURL}
                                    alt={img.tags}
                                />
                            );
                        })}
                    </ul>
                )}

                {imageList && !isBtnHidden && (
                    <Button
                        onFindMore={() => this.onFindMore()}
                        text={"Load more"}
                    />
                )}
            </>
        )
    }
}

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
};