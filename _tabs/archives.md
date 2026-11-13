---
layout: default
title: Writing
permalink: /archives/
---

<section class="writing-page" aria-labelledby="writing-heading" data-od-id="writing">
  <header class="page-heading"><h1 id="writing-heading">Writing</h1><p>Notes from building software and solving the problems that come with it.</p></header>
  {% for post in site.posts %}
  <article class="writing-entry">
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%-d %B %Y' }}</time>
    <div><h2><a href="{{ post.url | relative_url }}">{{ post.title }} <span aria-hidden="true">↗</span></a></h2><p>{{ post.description }}</p><a class="text-link" href="{{ post.url | relative_url }}">Read the article <span aria-hidden="true">↗</span></a></div>
  </article>
  {% endfor %}
</section>
