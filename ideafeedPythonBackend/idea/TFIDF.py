import gensim
import nltk
import numpy as np
from nltk.tokenize import word_tokenize, sent_tokenize
import sys,os
import pickle



class MLModel:

    dictionary = {}
    file_docs = []
    tf_idf = None
    sims = None

    def train(self, data):
        MLModel.file_docs = []
        for f in data:
            tokens = sent_tokenize(f["idea_headline"])
            for line in tokens:
                MLModel.file_docs.append(line)
        gen_docs = [[w.lower() for w in word_tokenize(text)]
                    for text in MLModel.file_docs]
        MLModel.dictionary = gensim.corpora.Dictionary(gen_docs)
        corpus = [MLModel.dictionary.doc2bow(gen_doc) for gen_doc in gen_docs]
        MLModel.tf_idf = gensim.models.TfidfModel(corpus)
        # for doc in MLModel.tf_idf[corpus]:
        #     print([[MLModel.dictionary[id], np.around(freq, decimals=2)] for id, freq in doc])
        MLModel.sims = gensim.similarities.Similarity('.', MLModel.tf_idf[corpus], num_features=len(MLModel.dictionary))
        #print(MLModel.sims)

    def predict_similarity(self, data):
        cwd = os.getcwd()
        path = cwd+'/idea/TrainedData/dictionary'
        file_docs_path = cwd + '/idea/TrainedData/file_docs'
        tf_idf = cwd + '/idea/TrainedData/tf_idf'
        sims = cwd + '/idea/TrainedData/sims'
        dictionary = gensim.corpora.Dictionary.load(path)
        # print(dictionary)
        # print(type(dictionary))

        file_docs = pickle.load(open(file_docs_path, 'rb'))
        # print(file_docs)
        # print(type(file_docs))

        tf_idf = pickle.load(open(tf_idf,'rb'))
        # print(tf_idf)
        # print(type(tf_idf))

        sims = pickle.load(open(sims,'rb'))
        # print(sims)
        # print(type(sims))



        similar_sentence = None
        file2_docs = []

        tokens = sent_tokenize(data["idea_headline"])
        for line in tokens:
            file2_docs.append(line)

        for line in file2_docs:
            query_doc = [w.lower() for w in word_tokenize(line)]
            # print(query_doc)
            # print(MLModel.dictionary)
            query_doc_bow = dictionary.doc2bow(query_doc)

        query_doc_tf_idf = tf_idf[query_doc_bow]
        max_score = 0
        index = 0
        for score in sims[query_doc_tf_idf]:
            if score >= 0.5 and score > max_score:
                max_score = score
                similar_sentence = file_docs[index]
            index = index + 1
        # print("Max score", max_score)
        # print(similar_sentence)
        return similar_sentence

