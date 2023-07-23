import React, { Component } from "react";
import { Searchbar, ImageGallery, Modal } from "components";
import css from "./App.module.css";

export class App extends Component {
  state = {
    searchQuery: '',
    isModalVisible: false,
    modalImg: '',
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  showModal = largeImageURL => {
    this.setState({
      isModalVisible: true,
      modalImg: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { searchQuery, isModalVisible, modalImg } = this.state;
    
    return (
      <div className={css.app}>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ImageGallery
          searchQuery={searchQuery}
          showModal={this.showModal}
        />

        {isModalVisible && (
          <Modal
            closeModal={this.closeModal}
            modalImage={modalImg}
          />
        )}
      </div>
    );
  }
};