import React from 'react';

const Tags = (props) => {
    return <p className="post-tags">
        {props.list.map(tag =>
            <a href="#" 
               //className="badge badge-secondary"
               className="badge badge-default"
               key={tag.id}
               
            ><i className="fa fa-tag"></i> {tag}
            </a>
        )}
    </p>;
};

export default Tags;

/*<p class="post-tags">
        {% for tag in post.tags %}
            <a href="{{ path('blog_index', {'tag': tag.name == app.request.query.get('tag') ? null : tag.name}) }}"
               class="badge badge-{{ tag.name == app.request.query.get('tag') ? 'success' : 'secondary' }}"
            >
                <i class="fa fa-tag"></i> {{ tag.name }}
            </a>
        {% endfor %}
    </p>/*/