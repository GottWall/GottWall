  


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>bootstrap-datepicker/js/bootstrap-datepicker.js at master · eternicode/bootstrap-datepicker</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144.png" />
    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="LMT66a2kI9ZtLt9ZUGoGlMYxrpTzitbRq6uSBfgA1m8=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/assets/github-c5ef70471fb3f24a89603c63013670428431f609.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/assets/github2-9d67d355fef80aa4aa95e9a29207dfcb3f237cb9.css" media="screen" rel="stylesheet" type="text/css" />
    


      <script src="https://a248.e.akamai.net/assets.github.com/assets/frameworks-cc4895cbb610429d2ce48e7c2392822c33db2dfe.js" type="text/javascript"></script>
      <script src="https://a248.e.akamai.net/assets.github.com/assets/github-e539dcf1e3c93f4acda64d064d3f30a39afabae0.js" type="text/javascript"></script>
      

        <link rel='permalink' href='/eternicode/bootstrap-datepicker/blob/ca11c450c5d5013ba11e4abf9b45fdd17f05fea2/js/bootstrap-datepicker.js'>
    <meta property="og:title" content="bootstrap-datepicker"/>
    <meta property="og:type" content="githubog:gitrepository"/>
    <meta property="og:url" content="https://github.com/eternicode/bootstrap-datepicker"/>
    <meta property="og:image" content="https://secure.gravatar.com/avatar/d0d81c25265918acc35d089c7098276f?s=420&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"/>
    <meta property="og:site_name" content="GitHub"/>
    <meta property="og:description" content="bootstrap-datepicker - A datepicker for @twitter bootstrap forked from Stefan Petre's (of eyecon.ro), improvements by @eternicode"/>

    <meta name="description" content="bootstrap-datepicker - A datepicker for @twitter bootstrap forked from Stefan Petre's (of eyecon.ro), improvements by @eternicode" />

  <link href="https://github.com/eternicode/bootstrap-datepicker/commits/master.atom" rel="alternate" title="Recent Commits to bootstrap-datepicker:master" type="application/atom+xml" />

  </head>


  <body class="logged_in page-blob linux vis-public env-production ">
    <div id="wrapper">

      

      

      


        <div class="header header-logged-in true">
          <div class="container clearfix">

            <a class="header-logo-blacktocat" href="https://github.com/organizations/intaxi">
  <span class="mega-icon mega-icon-blacktocat"></span>
</a>

            <div class="divider-vertical"></div>

            
  <a href="/notifications" class="notification-indicator tooltipped downwards" title="You have unread notifications">
    <span class="mail-status unread"></span>
  </a>
  <div class="divider-vertical"></div>


              
  <div class="topsearch command-bar-activated">
    <form accept-charset="UTF-8" action="/search" class="command_bar_form" id="top_search_form" method="get">
  <a href="/search/advanced" class="advanced-search-icon tooltipped downwards command-bar-search" id="advanced_search" title="Advanced search"><span class="mini-icon mini-icon-advanced-search "></span></a>

  <input type="text" name="q" id="command-bar" placeholder="Search or type a command" tabindex="1" data-username="svitaliyv" autocapitalize="off">

  <span class="mini-icon help tooltipped downwards" title="Show command bar help">
    <span class="mini-icon mini-icon-help"></span>
  </span>

  <input type="hidden" name="ref" value="commandbar">

  <div class="divider-vertical"></div>
</form>

    <ul class="top-nav">
        <li class="explore"><a href="https://github.com/explore">Explore</a></li>
        <li><a href="https://gist.github.com">Gist</a></li>
        <li><a href="/blog">Blog</a></li>
      <li><a href="http://help.github.com">Help</a></li>
    </ul>
  </div>


            

  
    <ul id="user-links">
      <li>
        <a href="https://github.com/svitaliyv" class="name">
          <img height="20" src="https://secure.gravatar.com/avatar/c6ce1c54eb4ccffa1ab76fd77d1d4433?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /> svitaliyv
        </a>
      </li>
      <li>
        <a href="/new" id="new_repo" class="tooltipped downwards" title="Create a new repo">
          <span class="mini-icon mini-icon-create"></span>
        </a>
      </li>
      <li>
        <a href="/settings/profile" id="account_settings"
          class="tooltipped downwards"
          title="Account settings ">
          <span class="mini-icon mini-icon-account-settings"></span>
        </a>
      </li>
      <li>
          <a href="/logout" data-method="post" id="logout" class="tooltipped downwards" title="Sign out">
            <span class="mini-icon mini-icon-logout"></span>
          </a>
      </li>
    </ul>



            
          </div>
        </div>


      

      


            <div class="site hfeed" itemscope itemtype="http://schema.org/WebPage">
      <div class="hentry">
        
        <div class="pagehead repohead instapaper_ignore readability-menu">
          <div class="container">
            <div class="title-actions-bar">
              


                  <ul class="pagehead-actions">

          <li class="subscription">
              <form accept-charset="UTF-8" action="/notifications/subscribe" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="LMT66a2kI9ZtLt9ZUGoGlMYxrpTzitbRq6uSBfgA1m8=" /></div>  <input id="repository_id" name="repository_id" type="hidden" value="3744545" />
  <div class="context-menu-container js-menu-container js-context-menu">
    <span class="minibutton switcher bigger js-menu-target">
      <span class="js-context-button">
          <span class="mini-icon mini-icon-watching"></span>Watch
      </span>
    </span>

    <div class="context-pane js-menu-content">
      <a href="#" class="close js-menu-close"><span class="mini-icon mini-icon-remove-close"></span></a>
      <div class="context-title">Notification status</div>

      <div class="context-body pane-selector">
        <ul class="js-navigation-container">
          <li class="selector-item js-navigation-item js-navigation-target selected">
            <span class="mini-icon mini-icon-confirm"></span>
            <label>
              <input checked="checked" id="do_included" name="do" type="radio" value="included" />
              <h4>Not watching</h4>
              <p>You will only receive notifications when you participate or are mentioned.</p>
            </label>
            <span class="context-button-text js-context-button-text">
              <span class="mini-icon mini-icon-watching"></span>
              Watch
            </span>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target ">
            <span class="mini-icon mini-icon-confirm"></span>
            <label>
              <input id="do_subscribed" name="do" type="radio" value="subscribed" />
              <h4>Watching</h4>
              <p>You will receive all notifications for this repository.</p>
            </label>
            <span class="context-button-text js-context-button-text">
              <span class="mini-icon mini-icon-unwatch"></span>
              Unwatch
            </span>
          </li>
          <li class="selector-item js-navigation-item js-navigation-target ">
            <span class="mini-icon mini-icon-confirm"></span>
            <label>
              <input id="do_ignore" name="do" type="radio" value="ignore" />
              <h4>Ignored</h4>
              <p>You will not receive notifications for this repository.</p>
            </label>
            <span class="context-button-text js-context-button-text">
              <span class="mini-icon mini-icon-mute"></span>
              Stop ignoring
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</form>
          </li>

          <li class="js-toggler-container js-social-container starring-container ">
            <a href="/eternicode/bootstrap-datepicker/unstar" class="minibutton js-toggler-target starred" data-remote="true" data-method="post" rel="nofollow">
              <span class="mini-icon mini-icon-star"></span>Unstar
            </a><a href="/eternicode/bootstrap-datepicker/star" class="minibutton js-toggler-target unstarred" data-remote="true" data-method="post" rel="nofollow">
              <span class="mini-icon mini-icon-star"></span>Star
            </a><a class="social-count js-social-count" href="/eternicode/bootstrap-datepicker/stargazers">1,620</a>
          </li>

              <li>
                <a href="/eternicode/bootstrap-datepicker/fork_select" class="minibutton js-toggler-target lighter" rel="facebox nofollow"><span class="mini-icon mini-icon-fork"></span>Fork</a><a href="/eternicode/bootstrap-datepicker/network" class="social-count">483</a>
              </li>


    </ul>

              <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
                <span class="repo-label"><span>public</span></span>
                <span class="mega-icon mega-icon-public-repo"></span>
                <span class="author vcard">
                  <a href="/eternicode" class="url fn" itemprop="url" rel="author">
                  <span itemprop="title">eternicode</span>
                  </a></span> /
                <strong><a href="/eternicode/bootstrap-datepicker" class="js-current-repository">bootstrap-datepicker</a></strong>
              </h1>
            </div>

            

  <ul class="tabs">
    <li><a href="/eternicode/bootstrap-datepicker" class="selected" highlight="repo_sourcerepo_downloadsrepo_commitsrepo_tagsrepo_branches">Code</a></li>
    <li><a href="/eternicode/bootstrap-datepicker/network" highlight="repo_network">Network</a></li>
    <li><a href="/eternicode/bootstrap-datepicker/pulls" highlight="repo_pulls">Pull Requests <span class='counter'>30</span></a></li>

      <li><a href="/eternicode/bootstrap-datepicker/issues" highlight="repo_issues">Issues <span class='counter'>104</span></a></li>

      <li><a href="/eternicode/bootstrap-datepicker/wiki" highlight="repo_wiki">Wiki</a></li>


    <li><a href="/eternicode/bootstrap-datepicker/graphs" highlight="repo_graphsrepo_contributors">Graphs</a></li>


  </ul>
  
<div class="tabnav">

  <span class="tabnav-right">
    <ul class="tabnav-tabs">
          <li><a href="/eternicode/bootstrap-datepicker/tags" class="tabnav-tab" highlight="repo_tags">Tags <span class="counter blank">0</span></a></li>
    </ul>
    
  </span>

  <div class="tabnav-widget scope">


    <div class="select-menu js-menu-container js-select-menu js-branch-menu">
      <a class="minibutton select-menu-button js-menu-target" data-hotkey="w" data-ref="master">
        <span class="mini-icon mini-icon-branch"></span>
        <i>branch:</i>
        <span class="js-select-button">master</span>
      </a>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container js-select-menu-pane">

        <div class="select-menu-modal js-select-menu-pane">
          <div class="select-menu-header">
            <span class="select-menu-title">Switch branches/tags</span>
            <span class="mini-icon mini-icon-remove-close js-menu-close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-filters">
            <div class="select-menu-text-filter">
              <input type="text" id="commitish-filter-field" class="js-select-menu-text-filter js-filterable-field js-navigation-enable" placeholder="Find or create a branch…">
            </div> <!-- /.select-menu-text-filter -->
            <div class="select-menu-tabs">
              <ul>
                <li class="select-menu-tab">
                  <a href="#" data-filter="branches" class="js-select-menu-tab selected">Branches</a>
                </li>
                <li class="select-menu-tab">
                  <a href="#" data-filter="tags" class="js-select-menu-tab">Tags</a>
                </li>
              </ul>
            </div><!-- /.select-menu-tabs -->
          </div><!-- /.select-menu-filters -->

          <div class="select-menu-list js-filter-tab js-filter-branches" data-filterable-for="commitish-filter-field" data-filterable-type="substring">



              <div class="select-menu-item js-navigation-item js-navigation-target ">
                <span class="select-menu-checkmark mini-icon mini-icon-confirm"></span>

                    <a href="/eternicode/bootstrap-datepicker/blob/extensible/js/bootstrap-datepicker.js" class="js-navigation-open select-menu-item-text js-select-button-text" data-name="extensible" rel="nofollow">extensible</a>

              </div> <!-- /.select-menu-item -->



              <div class="select-menu-item js-navigation-item js-navigation-target selected">
                <span class="select-menu-checkmark mini-icon mini-icon-confirm"></span>

                    <a href="/eternicode/bootstrap-datepicker/blob/master/js/bootstrap-datepicker.js" class="js-navigation-open select-menu-item-text js-select-button-text" data-name="master" rel="nofollow">master</a>

              </div> <!-- /.select-menu-item -->



              <div class="select-menu-item js-navigation-item js-navigation-target ">
                <span class="select-menu-checkmark mini-icon mini-icon-confirm"></span>

                    <a href="/eternicode/bootstrap-datepicker/blob/range/js/bootstrap-datepicker.js" class="js-navigation-open select-menu-item-text js-select-button-text" data-name="range" rel="nofollow">range</a>

              </div> <!-- /.select-menu-item -->


              <div class="select-menu-no-results js-not-filterable">Nothing to show</div>
          </div> <!-- /.select-menu-list -->


          <div class="select-menu-list js-filter-tab js-filter-tags" data-filterable-for="commitish-filter-field" data-filterable-type="substring" style="display:none;">


            <div class="select-menu-no-results js-not-filterable">Nothing to show</div>

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

  </div> <!-- /.scope -->

  <ul class="tabnav-tabs">
    <li><a href="/eternicode/bootstrap-datepicker" class="selected tabnav-tab" highlight="repo_source">Files</a></li>
    <li><a href="/eternicode/bootstrap-datepicker/commits/master" class="tabnav-tab" highlight="repo_commits">Commits</a></li>
    <li><a href="/eternicode/bootstrap-datepicker/branches" class="tabnav-tab" highlight="repo_branches" rel="nofollow">Branches <span class="counter ">3</span></a></li>
  </ul>

</div>

  
  
  


            
          </div>
        </div><!-- /.repohead -->

        <div id="js-repo-pjax-container" class="container context-loader-container" data-pjax-container>
          


<!-- blob contrib key: blob_contributors:v21:ec38c5243f91e282d356d1fb578f7780 -->
<!-- blob contrib frag key: views10/v8/blob_contributors:v21:ec38c5243f91e282d356d1fb578f7780 -->

<div id="slider">


    <div class="frame-meta">

      <p title="This is a placeholder element" class="js-history-link-replace hidden"></p>
      <div class="breadcrumb">
        <span class='bold'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/eternicode/bootstrap-datepicker" class="js-slide-to" data-direction="back" itemscope="url"><span itemprop="title">bootstrap-datepicker</span></a></span></span> / <span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/eternicode/bootstrap-datepicker/tree/master/js" class="js-slide-to" data-direction="back" itemscope="url"><span itemprop="title">js</span></a></span> / <strong class="final-path">bootstrap-datepicker.js</strong> <span class="js-zeroclipboard zeroclipboard-button" data-clipboard-text="js/bootstrap-datepicker.js" data-copied-hint="copied!" title="copy to clipboard"><span class="mini-icon mini-icon-clipboard"></span></span>
      </div>

      <a href="/eternicode/bootstrap-datepicker/find/master" class="js-slide-to" data-hotkey="t" style="display:none">Show File Finder</a>

        
  <div class="commit file-history-tease">
    <img class="main-avatar" height="24" src="https://secure.gravatar.com/avatar/d0d81c25265918acc35d089c7098276f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
    <span class="author"><a href="/eternicode" rel="author">eternicode</a></span>
    <time class="js-relative-date" datetime="2013-01-13T11:47:38-08:00" title="2013-01-13 11:47:38">January 13, 2013</time>
    <div class="commit-title">
        <a href="/eternicode/bootstrap-datepicker/commit/ca11c450c5d5013ba11e4abf9b45fdd17f05fea2" class="message">Fix bug with changeDate triggering on viewDate change, not date change</a>
    </div>

    <div class="participation">
      <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>35</strong> contributors</a></p>
          <a class="avatar tooltipped downwards" title="eternicode" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=eternicode"><img height="20" src="https://secure.gravatar.com/avatar/d0d81c25265918acc35d089c7098276f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="vitalets" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=vitalets"><img height="20" src="https://secure.gravatar.com/avatar/edff2767a740bdfb38d87928424bbeda?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="tcrosen" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=tcrosen"><img height="20" src="https://secure.gravatar.com/avatar/6a5129ed9959a28a7537847cc6bd9f91?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="dionysiosarvanitis" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=dionysiosarvanitis"><img height="20" src="https://secure.gravatar.com/avatar/38ca483fb8e759b18cbfc194588cf089?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="camupod" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=camupod"><img height="20" src="https://secure.gravatar.com/avatar/cd67753dc3234a37cdb4fd1118ebacc0?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="CauanCabral" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=CauanCabral"><img height="20" src="https://secure.gravatar.com/avatar/8979660491f1e3423678759238a49753?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="warrenseymour" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=warrenseymour"><img height="20" src="https://secure.gravatar.com/avatar/6f9035ab4ec1c769c22c068562d78f86?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="caarlos0" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=caarlos0"><img height="20" src="https://secure.gravatar.com/avatar/7ef3cd04888c6d17f34d43e29ec3d46f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="ansman" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=ansman"><img height="20" src="https://secure.gravatar.com/avatar/6e1b4fb1960b220515c1673b728b3794?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="samzurcher" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=samzurcher"><img height="20" src="https://secure.gravatar.com/avatar/d12b5dfa98c61f22dbc5c38d2802b1d3?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="pjlammertyn" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=pjlammertyn"><img height="20" src="https://secure.gravatar.com/avatar/5bec726510e31103a736fc97b50f57a4?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="vicox" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=vicox"><img height="20" src="https://secure.gravatar.com/avatar/9f1ec4610c0f01878a9835b3e43c8d45?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="macodev" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=macodev"><img height="20" src="https://secure.gravatar.com/avatar/f05f1d74310bc750064abdfd31ce9f40?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="hippipp" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=hippipp"><img height="20" src="https://secure.gravatar.com/avatar/5792f55746797f05d02e84f0d13391f9?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="mshafrir" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=mshafrir"><img height="20" src="https://secure.gravatar.com/avatar/b8fbfad45e80355228341ab506adcf97?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="gboer" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=gboer"><img height="20" src="https://secure.gravatar.com/avatar/cd73ad3884cf23224643c1856b0f8c6b?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="wpasternak" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=wpasternak"><img height="20" src="https://secure.gravatar.com/avatar/ee0fdaf44a2c11abf68a7d505b932074?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="1st8" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=1st8"><img height="20" src="https://secure.gravatar.com/avatar/2d76f7c9f12c55a28a26c8d493ef5e87?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="bbonamin" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=bbonamin"><img height="20" src="https://secure.gravatar.com/avatar/27a4802fa7723366f40db091964f757b?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="dule" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=dule"><img height="20" src="https://secure.gravatar.com/avatar/72110a81aa33401993b1ba458416cb52?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="vulgarcoder" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=vulgarcoder"><img height="20" src="https://secure.gravatar.com/avatar/f7cb1035ea5c9ae12583bc6ba561fab8?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="Bloafer" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=Bloafer"><img height="20" src="https://secure.gravatar.com/avatar/ac1c3caf0deae24d45c2d6890d46e10f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="dentarg" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=dentarg"><img height="20" src="https://secure.gravatar.com/avatar/67e3b794bd899226a8958ec92ffa24d2?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="addbrick" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=addbrick"><img height="20" src="https://secure.gravatar.com/avatar/886ab20c68986238339f624d95989c29?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="coopernurse" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=coopernurse"><img height="20" src="https://secure.gravatar.com/avatar/51526dd8566f5def7a227e93daf05de3?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="hinrik" href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js?author=hinrik"><img height="20" src="https://secure.gravatar.com/avatar/42d807114ef02417d17a1bd1aa1f9096?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="20" /></a>

      <a href="#blob_contributors_box" rel="facebox" class="others-text">and others.</a>

    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2>Users on GitHub who have contributed to this file</h2>
      <ul class="facebox-user-list">
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/d0d81c25265918acc35d089c7098276f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/eternicode">eternicode</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/edff2767a740bdfb38d87928424bbeda?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/vitalets">vitalets</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/6a5129ed9959a28a7537847cc6bd9f91?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/tcrosen">tcrosen</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/38ca483fb8e759b18cbfc194588cf089?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/dionysiosarvanitis">dionysiosarvanitis</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/cd67753dc3234a37cdb4fd1118ebacc0?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/camupod">camupod</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/8979660491f1e3423678759238a49753?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/CauanCabral">CauanCabral</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/6f9035ab4ec1c769c22c068562d78f86?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/warrenseymour">warrenseymour</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/7ef3cd04888c6d17f34d43e29ec3d46f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/caarlos0">caarlos0</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/6e1b4fb1960b220515c1673b728b3794?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/ansman">ansman</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/d12b5dfa98c61f22dbc5c38d2802b1d3?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/samzurcher">samzurcher</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/5bec726510e31103a736fc97b50f57a4?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/pjlammertyn">pjlammertyn</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/9f1ec4610c0f01878a9835b3e43c8d45?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/vicox">vicox</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/f05f1d74310bc750064abdfd31ce9f40?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/macodev">macodev</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/5792f55746797f05d02e84f0d13391f9?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/hippipp">hippipp</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/b8fbfad45e80355228341ab506adcf97?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/mshafrir">mshafrir</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/cd73ad3884cf23224643c1856b0f8c6b?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/gboer">gboer</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/ee0fdaf44a2c11abf68a7d505b932074?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/wpasternak">wpasternak</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/2d76f7c9f12c55a28a26c8d493ef5e87?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/1st8">1st8</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/27a4802fa7723366f40db091964f757b?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/bbonamin">bbonamin</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/72110a81aa33401993b1ba458416cb52?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/dule">dule</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/f7cb1035ea5c9ae12583bc6ba561fab8?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/vulgarcoder">vulgarcoder</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/ac1c3caf0deae24d45c2d6890d46e10f?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/Bloafer">Bloafer</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/67e3b794bd899226a8958ec92ffa24d2?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/dentarg">dentarg</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/886ab20c68986238339f624d95989c29?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/addbrick">addbrick</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/51526dd8566f5def7a227e93daf05de3?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/coopernurse">coopernurse</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/42d807114ef02417d17a1bd1aa1f9096?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/hinrik">hinrik</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/a5a40a662ec4c0861c67f97c973d14b1?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/denis-sokolov">denis-sokolov</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/d99d4348efece42f6752b6ee30c6deb6?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/rjfranco">rjfranco</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/743f31b03871dfa984fe9f9ea7da0c56?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/nicomollet">nicomollet</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/2f40f2d92b1ec4718fa13009e5713cbf?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/zgohr">zgohr</a>
        </li>
        <li>
          <img height="24" src="https://secure.gravatar.com/avatar/e26021aa74f9051f6626f9e2da46a891?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png" width="24" />
          <a href="/zakjan">zakjan</a>
        </li>
      </ul>
    </div>
  </div>


    </div><!-- ./.frame-meta -->

    <div class="frames">
      <div class="frame" data-permalink-url="/eternicode/bootstrap-datepicker/blob/ca11c450c5d5013ba11e4abf9b45fdd17f05fea2/js/bootstrap-datepicker.js" data-title="bootstrap-datepicker/js/bootstrap-datepicker.js at master · eternicode/bootstrap-datepicker · GitHub" data-type="blob">

        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><b class="mini-icon mini-icon-text-file"></b></span>
                <span class="mode" title="File Mode">file</span>
                  <span>980 lines (922 sloc)</span>
                <span>30.727 kb</span>
              </div>
              <ul class="button-group actions">
                  <li>
                        <a class="grouped-button minibutton bigger lighter tooltipped leftwards"
                           title="Clicking this button will automatically fork this project so you can edit the file"
                           href="/eternicode/bootstrap-datepicker/edit/master/js/bootstrap-datepicker.js"
                           data-method="post" rel="nofollow">Edit</a>
                  </li>
                <li><a href="/eternicode/bootstrap-datepicker/raw/master/js/bootstrap-datepicker.js" class="button minibutton grouped-button bigger lighter" id="raw-url">Raw</a></li>
                  <li><a href="/eternicode/bootstrap-datepicker/blame/master/js/bootstrap-datepicker.js" class="button minibutton grouped-button bigger lighter">Blame</a></li>
                <li><a href="/eternicode/bootstrap-datepicker/commits/master/js/bootstrap-datepicker.js" class="button minibutton grouped-button bigger lighter" rel="nofollow">History</a></li>
              </ul>

            </div>
                <div class="data type-javascript js-blob-data">
      <table cellpadding="0" cellspacing="0" class="lines">
        <tr>
          <td>
            <pre class="line_numbers"><span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
<span id="L251" rel="#L251">251</span>
<span id="L252" rel="#L252">252</span>
<span id="L253" rel="#L253">253</span>
<span id="L254" rel="#L254">254</span>
<span id="L255" rel="#L255">255</span>
<span id="L256" rel="#L256">256</span>
<span id="L257" rel="#L257">257</span>
<span id="L258" rel="#L258">258</span>
<span id="L259" rel="#L259">259</span>
<span id="L260" rel="#L260">260</span>
<span id="L261" rel="#L261">261</span>
<span id="L262" rel="#L262">262</span>
<span id="L263" rel="#L263">263</span>
<span id="L264" rel="#L264">264</span>
<span id="L265" rel="#L265">265</span>
<span id="L266" rel="#L266">266</span>
<span id="L267" rel="#L267">267</span>
<span id="L268" rel="#L268">268</span>
<span id="L269" rel="#L269">269</span>
<span id="L270" rel="#L270">270</span>
<span id="L271" rel="#L271">271</span>
<span id="L272" rel="#L272">272</span>
<span id="L273" rel="#L273">273</span>
<span id="L274" rel="#L274">274</span>
<span id="L275" rel="#L275">275</span>
<span id="L276" rel="#L276">276</span>
<span id="L277" rel="#L277">277</span>
<span id="L278" rel="#L278">278</span>
<span id="L279" rel="#L279">279</span>
<span id="L280" rel="#L280">280</span>
<span id="L281" rel="#L281">281</span>
<span id="L282" rel="#L282">282</span>
<span id="L283" rel="#L283">283</span>
<span id="L284" rel="#L284">284</span>
<span id="L285" rel="#L285">285</span>
<span id="L286" rel="#L286">286</span>
<span id="L287" rel="#L287">287</span>
<span id="L288" rel="#L288">288</span>
<span id="L289" rel="#L289">289</span>
<span id="L290" rel="#L290">290</span>
<span id="L291" rel="#L291">291</span>
<span id="L292" rel="#L292">292</span>
<span id="L293" rel="#L293">293</span>
<span id="L294" rel="#L294">294</span>
<span id="L295" rel="#L295">295</span>
<span id="L296" rel="#L296">296</span>
<span id="L297" rel="#L297">297</span>
<span id="L298" rel="#L298">298</span>
<span id="L299" rel="#L299">299</span>
<span id="L300" rel="#L300">300</span>
<span id="L301" rel="#L301">301</span>
<span id="L302" rel="#L302">302</span>
<span id="L303" rel="#L303">303</span>
<span id="L304" rel="#L304">304</span>
<span id="L305" rel="#L305">305</span>
<span id="L306" rel="#L306">306</span>
<span id="L307" rel="#L307">307</span>
<span id="L308" rel="#L308">308</span>
<span id="L309" rel="#L309">309</span>
<span id="L310" rel="#L310">310</span>
<span id="L311" rel="#L311">311</span>
<span id="L312" rel="#L312">312</span>
<span id="L313" rel="#L313">313</span>
<span id="L314" rel="#L314">314</span>
<span id="L315" rel="#L315">315</span>
<span id="L316" rel="#L316">316</span>
<span id="L317" rel="#L317">317</span>
<span id="L318" rel="#L318">318</span>
<span id="L319" rel="#L319">319</span>
<span id="L320" rel="#L320">320</span>
<span id="L321" rel="#L321">321</span>
<span id="L322" rel="#L322">322</span>
<span id="L323" rel="#L323">323</span>
<span id="L324" rel="#L324">324</span>
<span id="L325" rel="#L325">325</span>
<span id="L326" rel="#L326">326</span>
<span id="L327" rel="#L327">327</span>
<span id="L328" rel="#L328">328</span>
<span id="L329" rel="#L329">329</span>
<span id="L330" rel="#L330">330</span>
<span id="L331" rel="#L331">331</span>
<span id="L332" rel="#L332">332</span>
<span id="L333" rel="#L333">333</span>
<span id="L334" rel="#L334">334</span>
<span id="L335" rel="#L335">335</span>
<span id="L336" rel="#L336">336</span>
<span id="L337" rel="#L337">337</span>
<span id="L338" rel="#L338">338</span>
<span id="L339" rel="#L339">339</span>
<span id="L340" rel="#L340">340</span>
<span id="L341" rel="#L341">341</span>
<span id="L342" rel="#L342">342</span>
<span id="L343" rel="#L343">343</span>
<span id="L344" rel="#L344">344</span>
<span id="L345" rel="#L345">345</span>
<span id="L346" rel="#L346">346</span>
<span id="L347" rel="#L347">347</span>
<span id="L348" rel="#L348">348</span>
<span id="L349" rel="#L349">349</span>
<span id="L350" rel="#L350">350</span>
<span id="L351" rel="#L351">351</span>
<span id="L352" rel="#L352">352</span>
<span id="L353" rel="#L353">353</span>
<span id="L354" rel="#L354">354</span>
<span id="L355" rel="#L355">355</span>
<span id="L356" rel="#L356">356</span>
<span id="L357" rel="#L357">357</span>
<span id="L358" rel="#L358">358</span>
<span id="L359" rel="#L359">359</span>
<span id="L360" rel="#L360">360</span>
<span id="L361" rel="#L361">361</span>
<span id="L362" rel="#L362">362</span>
<span id="L363" rel="#L363">363</span>
<span id="L364" rel="#L364">364</span>
<span id="L365" rel="#L365">365</span>
<span id="L366" rel="#L366">366</span>
<span id="L367" rel="#L367">367</span>
<span id="L368" rel="#L368">368</span>
<span id="L369" rel="#L369">369</span>
<span id="L370" rel="#L370">370</span>
<span id="L371" rel="#L371">371</span>
<span id="L372" rel="#L372">372</span>
<span id="L373" rel="#L373">373</span>
<span id="L374" rel="#L374">374</span>
<span id="L375" rel="#L375">375</span>
<span id="L376" rel="#L376">376</span>
<span id="L377" rel="#L377">377</span>
<span id="L378" rel="#L378">378</span>
<span id="L379" rel="#L379">379</span>
<span id="L380" rel="#L380">380</span>
<span id="L381" rel="#L381">381</span>
<span id="L382" rel="#L382">382</span>
<span id="L383" rel="#L383">383</span>
<span id="L384" rel="#L384">384</span>
<span id="L385" rel="#L385">385</span>
<span id="L386" rel="#L386">386</span>
<span id="L387" rel="#L387">387</span>
<span id="L388" rel="#L388">388</span>
<span id="L389" rel="#L389">389</span>
<span id="L390" rel="#L390">390</span>
<span id="L391" rel="#L391">391</span>
<span id="L392" rel="#L392">392</span>
<span id="L393" rel="#L393">393</span>
<span id="L394" rel="#L394">394</span>
<span id="L395" rel="#L395">395</span>
<span id="L396" rel="#L396">396</span>
<span id="L397" rel="#L397">397</span>
<span id="L398" rel="#L398">398</span>
<span id="L399" rel="#L399">399</span>
<span id="L400" rel="#L400">400</span>
<span id="L401" rel="#L401">401</span>
<span id="L402" rel="#L402">402</span>
<span id="L403" rel="#L403">403</span>
<span id="L404" rel="#L404">404</span>
<span id="L405" rel="#L405">405</span>
<span id="L406" rel="#L406">406</span>
<span id="L407" rel="#L407">407</span>
<span id="L408" rel="#L408">408</span>
<span id="L409" rel="#L409">409</span>
<span id="L410" rel="#L410">410</span>
<span id="L411" rel="#L411">411</span>
<span id="L412" rel="#L412">412</span>
<span id="L413" rel="#L413">413</span>
<span id="L414" rel="#L414">414</span>
<span id="L415" rel="#L415">415</span>
<span id="L416" rel="#L416">416</span>
<span id="L417" rel="#L417">417</span>
<span id="L418" rel="#L418">418</span>
<span id="L419" rel="#L419">419</span>
<span id="L420" rel="#L420">420</span>
<span id="L421" rel="#L421">421</span>
<span id="L422" rel="#L422">422</span>
<span id="L423" rel="#L423">423</span>
<span id="L424" rel="#L424">424</span>
<span id="L425" rel="#L425">425</span>
<span id="L426" rel="#L426">426</span>
<span id="L427" rel="#L427">427</span>
<span id="L428" rel="#L428">428</span>
<span id="L429" rel="#L429">429</span>
<span id="L430" rel="#L430">430</span>
<span id="L431" rel="#L431">431</span>
<span id="L432" rel="#L432">432</span>
<span id="L433" rel="#L433">433</span>
<span id="L434" rel="#L434">434</span>
<span id="L435" rel="#L435">435</span>
<span id="L436" rel="#L436">436</span>
<span id="L437" rel="#L437">437</span>
<span id="L438" rel="#L438">438</span>
<span id="L439" rel="#L439">439</span>
<span id="L440" rel="#L440">440</span>
<span id="L441" rel="#L441">441</span>
<span id="L442" rel="#L442">442</span>
<span id="L443" rel="#L443">443</span>
<span id="L444" rel="#L444">444</span>
<span id="L445" rel="#L445">445</span>
<span id="L446" rel="#L446">446</span>
<span id="L447" rel="#L447">447</span>
<span id="L448" rel="#L448">448</span>
<span id="L449" rel="#L449">449</span>
<span id="L450" rel="#L450">450</span>
<span id="L451" rel="#L451">451</span>
<span id="L452" rel="#L452">452</span>
<span id="L453" rel="#L453">453</span>
<span id="L454" rel="#L454">454</span>
<span id="L455" rel="#L455">455</span>
<span id="L456" rel="#L456">456</span>
<span id="L457" rel="#L457">457</span>
<span id="L458" rel="#L458">458</span>
<span id="L459" rel="#L459">459</span>
<span id="L460" rel="#L460">460</span>
<span id="L461" rel="#L461">461</span>
<span id="L462" rel="#L462">462</span>
<span id="L463" rel="#L463">463</span>
<span id="L464" rel="#L464">464</span>
<span id="L465" rel="#L465">465</span>
<span id="L466" rel="#L466">466</span>
<span id="L467" rel="#L467">467</span>
<span id="L468" rel="#L468">468</span>
<span id="L469" rel="#L469">469</span>
<span id="L470" rel="#L470">470</span>
<span id="L471" rel="#L471">471</span>
<span id="L472" rel="#L472">472</span>
<span id="L473" rel="#L473">473</span>
<span id="L474" rel="#L474">474</span>
<span id="L475" rel="#L475">475</span>
<span id="L476" rel="#L476">476</span>
<span id="L477" rel="#L477">477</span>
<span id="L478" rel="#L478">478</span>
<span id="L479" rel="#L479">479</span>
<span id="L480" rel="#L480">480</span>
<span id="L481" rel="#L481">481</span>
<span id="L482" rel="#L482">482</span>
<span id="L483" rel="#L483">483</span>
<span id="L484" rel="#L484">484</span>
<span id="L485" rel="#L485">485</span>
<span id="L486" rel="#L486">486</span>
<span id="L487" rel="#L487">487</span>
<span id="L488" rel="#L488">488</span>
<span id="L489" rel="#L489">489</span>
<span id="L490" rel="#L490">490</span>
<span id="L491" rel="#L491">491</span>
<span id="L492" rel="#L492">492</span>
<span id="L493" rel="#L493">493</span>
<span id="L494" rel="#L494">494</span>
<span id="L495" rel="#L495">495</span>
<span id="L496" rel="#L496">496</span>
<span id="L497" rel="#L497">497</span>
<span id="L498" rel="#L498">498</span>
<span id="L499" rel="#L499">499</span>
<span id="L500" rel="#L500">500</span>
<span id="L501" rel="#L501">501</span>
<span id="L502" rel="#L502">502</span>
<span id="L503" rel="#L503">503</span>
<span id="L504" rel="#L504">504</span>
<span id="L505" rel="#L505">505</span>
<span id="L506" rel="#L506">506</span>
<span id="L507" rel="#L507">507</span>
<span id="L508" rel="#L508">508</span>
<span id="L509" rel="#L509">509</span>
<span id="L510" rel="#L510">510</span>
<span id="L511" rel="#L511">511</span>
<span id="L512" rel="#L512">512</span>
<span id="L513" rel="#L513">513</span>
<span id="L514" rel="#L514">514</span>
<span id="L515" rel="#L515">515</span>
<span id="L516" rel="#L516">516</span>
<span id="L517" rel="#L517">517</span>
<span id="L518" rel="#L518">518</span>
<span id="L519" rel="#L519">519</span>
<span id="L520" rel="#L520">520</span>
<span id="L521" rel="#L521">521</span>
<span id="L522" rel="#L522">522</span>
<span id="L523" rel="#L523">523</span>
<span id="L524" rel="#L524">524</span>
<span id="L525" rel="#L525">525</span>
<span id="L526" rel="#L526">526</span>
<span id="L527" rel="#L527">527</span>
<span id="L528" rel="#L528">528</span>
<span id="L529" rel="#L529">529</span>
<span id="L530" rel="#L530">530</span>
<span id="L531" rel="#L531">531</span>
<span id="L532" rel="#L532">532</span>
<span id="L533" rel="#L533">533</span>
<span id="L534" rel="#L534">534</span>
<span id="L535" rel="#L535">535</span>
<span id="L536" rel="#L536">536</span>
<span id="L537" rel="#L537">537</span>
<span id="L538" rel="#L538">538</span>
<span id="L539" rel="#L539">539</span>
<span id="L540" rel="#L540">540</span>
<span id="L541" rel="#L541">541</span>
<span id="L542" rel="#L542">542</span>
<span id="L543" rel="#L543">543</span>
<span id="L544" rel="#L544">544</span>
<span id="L545" rel="#L545">545</span>
<span id="L546" rel="#L546">546</span>
<span id="L547" rel="#L547">547</span>
<span id="L548" rel="#L548">548</span>
<span id="L549" rel="#L549">549</span>
<span id="L550" rel="#L550">550</span>
<span id="L551" rel="#L551">551</span>
<span id="L552" rel="#L552">552</span>
<span id="L553" rel="#L553">553</span>
<span id="L554" rel="#L554">554</span>
<span id="L555" rel="#L555">555</span>
<span id="L556" rel="#L556">556</span>
<span id="L557" rel="#L557">557</span>
<span id="L558" rel="#L558">558</span>
<span id="L559" rel="#L559">559</span>
<span id="L560" rel="#L560">560</span>
<span id="L561" rel="#L561">561</span>
<span id="L562" rel="#L562">562</span>
<span id="L563" rel="#L563">563</span>
<span id="L564" rel="#L564">564</span>
<span id="L565" rel="#L565">565</span>
<span id="L566" rel="#L566">566</span>
<span id="L567" rel="#L567">567</span>
<span id="L568" rel="#L568">568</span>
<span id="L569" rel="#L569">569</span>
<span id="L570" rel="#L570">570</span>
<span id="L571" rel="#L571">571</span>
<span id="L572" rel="#L572">572</span>
<span id="L573" rel="#L573">573</span>
<span id="L574" rel="#L574">574</span>
<span id="L575" rel="#L575">575</span>
<span id="L576" rel="#L576">576</span>
<span id="L577" rel="#L577">577</span>
<span id="L578" rel="#L578">578</span>
<span id="L579" rel="#L579">579</span>
<span id="L580" rel="#L580">580</span>
<span id="L581" rel="#L581">581</span>
<span id="L582" rel="#L582">582</span>
<span id="L583" rel="#L583">583</span>
<span id="L584" rel="#L584">584</span>
<span id="L585" rel="#L585">585</span>
<span id="L586" rel="#L586">586</span>
<span id="L587" rel="#L587">587</span>
<span id="L588" rel="#L588">588</span>
<span id="L589" rel="#L589">589</span>
<span id="L590" rel="#L590">590</span>
<span id="L591" rel="#L591">591</span>
<span id="L592" rel="#L592">592</span>
<span id="L593" rel="#L593">593</span>
<span id="L594" rel="#L594">594</span>
<span id="L595" rel="#L595">595</span>
<span id="L596" rel="#L596">596</span>
<span id="L597" rel="#L597">597</span>
<span id="L598" rel="#L598">598</span>
<span id="L599" rel="#L599">599</span>
<span id="L600" rel="#L600">600</span>
<span id="L601" rel="#L601">601</span>
<span id="L602" rel="#L602">602</span>
<span id="L603" rel="#L603">603</span>
<span id="L604" rel="#L604">604</span>
<span id="L605" rel="#L605">605</span>
<span id="L606" rel="#L606">606</span>
<span id="L607" rel="#L607">607</span>
<span id="L608" rel="#L608">608</span>
<span id="L609" rel="#L609">609</span>
<span id="L610" rel="#L610">610</span>
<span id="L611" rel="#L611">611</span>
<span id="L612" rel="#L612">612</span>
<span id="L613" rel="#L613">613</span>
<span id="L614" rel="#L614">614</span>
<span id="L615" rel="#L615">615</span>
<span id="L616" rel="#L616">616</span>
<span id="L617" rel="#L617">617</span>
<span id="L618" rel="#L618">618</span>
<span id="L619" rel="#L619">619</span>
<span id="L620" rel="#L620">620</span>
<span id="L621" rel="#L621">621</span>
<span id="L622" rel="#L622">622</span>
<span id="L623" rel="#L623">623</span>
<span id="L624" rel="#L624">624</span>
<span id="L625" rel="#L625">625</span>
<span id="L626" rel="#L626">626</span>
<span id="L627" rel="#L627">627</span>
<span id="L628" rel="#L628">628</span>
<span id="L629" rel="#L629">629</span>
<span id="L630" rel="#L630">630</span>
<span id="L631" rel="#L631">631</span>
<span id="L632" rel="#L632">632</span>
<span id="L633" rel="#L633">633</span>
<span id="L634" rel="#L634">634</span>
<span id="L635" rel="#L635">635</span>
<span id="L636" rel="#L636">636</span>
<span id="L637" rel="#L637">637</span>
<span id="L638" rel="#L638">638</span>
<span id="L639" rel="#L639">639</span>
<span id="L640" rel="#L640">640</span>
<span id="L641" rel="#L641">641</span>
<span id="L642" rel="#L642">642</span>
<span id="L643" rel="#L643">643</span>
<span id="L644" rel="#L644">644</span>
<span id="L645" rel="#L645">645</span>
<span id="L646" rel="#L646">646</span>
<span id="L647" rel="#L647">647</span>
<span id="L648" rel="#L648">648</span>
<span id="L649" rel="#L649">649</span>
<span id="L650" rel="#L650">650</span>
<span id="L651" rel="#L651">651</span>
<span id="L652" rel="#L652">652</span>
<span id="L653" rel="#L653">653</span>
<span id="L654" rel="#L654">654</span>
<span id="L655" rel="#L655">655</span>
<span id="L656" rel="#L656">656</span>
<span id="L657" rel="#L657">657</span>
<span id="L658" rel="#L658">658</span>
<span id="L659" rel="#L659">659</span>
<span id="L660" rel="#L660">660</span>
<span id="L661" rel="#L661">661</span>
<span id="L662" rel="#L662">662</span>
<span id="L663" rel="#L663">663</span>
<span id="L664" rel="#L664">664</span>
<span id="L665" rel="#L665">665</span>
<span id="L666" rel="#L666">666</span>
<span id="L667" rel="#L667">667</span>
<span id="L668" rel="#L668">668</span>
<span id="L669" rel="#L669">669</span>
<span id="L670" rel="#L670">670</span>
<span id="L671" rel="#L671">671</span>
<span id="L672" rel="#L672">672</span>
<span id="L673" rel="#L673">673</span>
<span id="L674" rel="#L674">674</span>
<span id="L675" rel="#L675">675</span>
<span id="L676" rel="#L676">676</span>
<span id="L677" rel="#L677">677</span>
<span id="L678" rel="#L678">678</span>
<span id="L679" rel="#L679">679</span>
<span id="L680" rel="#L680">680</span>
<span id="L681" rel="#L681">681</span>
<span id="L682" rel="#L682">682</span>
<span id="L683" rel="#L683">683</span>
<span id="L684" rel="#L684">684</span>
<span id="L685" rel="#L685">685</span>
<span id="L686" rel="#L686">686</span>
<span id="L687" rel="#L687">687</span>
<span id="L688" rel="#L688">688</span>
<span id="L689" rel="#L689">689</span>
<span id="L690" rel="#L690">690</span>
<span id="L691" rel="#L691">691</span>
<span id="L692" rel="#L692">692</span>
<span id="L693" rel="#L693">693</span>
<span id="L694" rel="#L694">694</span>
<span id="L695" rel="#L695">695</span>
<span id="L696" rel="#L696">696</span>
<span id="L697" rel="#L697">697</span>
<span id="L698" rel="#L698">698</span>
<span id="L699" rel="#L699">699</span>
<span id="L700" rel="#L700">700</span>
<span id="L701" rel="#L701">701</span>
<span id="L702" rel="#L702">702</span>
<span id="L703" rel="#L703">703</span>
<span id="L704" rel="#L704">704</span>
<span id="L705" rel="#L705">705</span>
<span id="L706" rel="#L706">706</span>
<span id="L707" rel="#L707">707</span>
<span id="L708" rel="#L708">708</span>
<span id="L709" rel="#L709">709</span>
<span id="L710" rel="#L710">710</span>
<span id="L711" rel="#L711">711</span>
<span id="L712" rel="#L712">712</span>
<span id="L713" rel="#L713">713</span>
<span id="L714" rel="#L714">714</span>
<span id="L715" rel="#L715">715</span>
<span id="L716" rel="#L716">716</span>
<span id="L717" rel="#L717">717</span>
<span id="L718" rel="#L718">718</span>
<span id="L719" rel="#L719">719</span>
<span id="L720" rel="#L720">720</span>
<span id="L721" rel="#L721">721</span>
<span id="L722" rel="#L722">722</span>
<span id="L723" rel="#L723">723</span>
<span id="L724" rel="#L724">724</span>
<span id="L725" rel="#L725">725</span>
<span id="L726" rel="#L726">726</span>
<span id="L727" rel="#L727">727</span>
<span id="L728" rel="#L728">728</span>
<span id="L729" rel="#L729">729</span>
<span id="L730" rel="#L730">730</span>
<span id="L731" rel="#L731">731</span>
<span id="L732" rel="#L732">732</span>
<span id="L733" rel="#L733">733</span>
<span id="L734" rel="#L734">734</span>
<span id="L735" rel="#L735">735</span>
<span id="L736" rel="#L736">736</span>
<span id="L737" rel="#L737">737</span>
<span id="L738" rel="#L738">738</span>
<span id="L739" rel="#L739">739</span>
<span id="L740" rel="#L740">740</span>
<span id="L741" rel="#L741">741</span>
<span id="L742" rel="#L742">742</span>
<span id="L743" rel="#L743">743</span>
<span id="L744" rel="#L744">744</span>
<span id="L745" rel="#L745">745</span>
<span id="L746" rel="#L746">746</span>
<span id="L747" rel="#L747">747</span>
<span id="L748" rel="#L748">748</span>
<span id="L749" rel="#L749">749</span>
<span id="L750" rel="#L750">750</span>
<span id="L751" rel="#L751">751</span>
<span id="L752" rel="#L752">752</span>
<span id="L753" rel="#L753">753</span>
<span id="L754" rel="#L754">754</span>
<span id="L755" rel="#L755">755</span>
<span id="L756" rel="#L756">756</span>
<span id="L757" rel="#L757">757</span>
<span id="L758" rel="#L758">758</span>
<span id="L759" rel="#L759">759</span>
<span id="L760" rel="#L760">760</span>
<span id="L761" rel="#L761">761</span>
<span id="L762" rel="#L762">762</span>
<span id="L763" rel="#L763">763</span>
<span id="L764" rel="#L764">764</span>
<span id="L765" rel="#L765">765</span>
<span id="L766" rel="#L766">766</span>
<span id="L767" rel="#L767">767</span>
<span id="L768" rel="#L768">768</span>
<span id="L769" rel="#L769">769</span>
<span id="L770" rel="#L770">770</span>
<span id="L771" rel="#L771">771</span>
<span id="L772" rel="#L772">772</span>
<span id="L773" rel="#L773">773</span>
<span id="L774" rel="#L774">774</span>
<span id="L775" rel="#L775">775</span>
<span id="L776" rel="#L776">776</span>
<span id="L777" rel="#L777">777</span>
<span id="L778" rel="#L778">778</span>
<span id="L779" rel="#L779">779</span>
<span id="L780" rel="#L780">780</span>
<span id="L781" rel="#L781">781</span>
<span id="L782" rel="#L782">782</span>
<span id="L783" rel="#L783">783</span>
<span id="L784" rel="#L784">784</span>
<span id="L785" rel="#L785">785</span>
<span id="L786" rel="#L786">786</span>
<span id="L787" rel="#L787">787</span>
<span id="L788" rel="#L788">788</span>
<span id="L789" rel="#L789">789</span>
<span id="L790" rel="#L790">790</span>
<span id="L791" rel="#L791">791</span>
<span id="L792" rel="#L792">792</span>
<span id="L793" rel="#L793">793</span>
<span id="L794" rel="#L794">794</span>
<span id="L795" rel="#L795">795</span>
<span id="L796" rel="#L796">796</span>
<span id="L797" rel="#L797">797</span>
<span id="L798" rel="#L798">798</span>
<span id="L799" rel="#L799">799</span>
<span id="L800" rel="#L800">800</span>
<span id="L801" rel="#L801">801</span>
<span id="L802" rel="#L802">802</span>
<span id="L803" rel="#L803">803</span>
<span id="L804" rel="#L804">804</span>
<span id="L805" rel="#L805">805</span>
<span id="L806" rel="#L806">806</span>
<span id="L807" rel="#L807">807</span>
<span id="L808" rel="#L808">808</span>
<span id="L809" rel="#L809">809</span>
<span id="L810" rel="#L810">810</span>
<span id="L811" rel="#L811">811</span>
<span id="L812" rel="#L812">812</span>
<span id="L813" rel="#L813">813</span>
<span id="L814" rel="#L814">814</span>
<span id="L815" rel="#L815">815</span>
<span id="L816" rel="#L816">816</span>
<span id="L817" rel="#L817">817</span>
<span id="L818" rel="#L818">818</span>
<span id="L819" rel="#L819">819</span>
<span id="L820" rel="#L820">820</span>
<span id="L821" rel="#L821">821</span>
<span id="L822" rel="#L822">822</span>
<span id="L823" rel="#L823">823</span>
<span id="L824" rel="#L824">824</span>
<span id="L825" rel="#L825">825</span>
<span id="L826" rel="#L826">826</span>
<span id="L827" rel="#L827">827</span>
<span id="L828" rel="#L828">828</span>
<span id="L829" rel="#L829">829</span>
<span id="L830" rel="#L830">830</span>
<span id="L831" rel="#L831">831</span>
<span id="L832" rel="#L832">832</span>
<span id="L833" rel="#L833">833</span>
<span id="L834" rel="#L834">834</span>
<span id="L835" rel="#L835">835</span>
<span id="L836" rel="#L836">836</span>
<span id="L837" rel="#L837">837</span>
<span id="L838" rel="#L838">838</span>
<span id="L839" rel="#L839">839</span>
<span id="L840" rel="#L840">840</span>
<span id="L841" rel="#L841">841</span>
<span id="L842" rel="#L842">842</span>
<span id="L843" rel="#L843">843</span>
<span id="L844" rel="#L844">844</span>
<span id="L845" rel="#L845">845</span>
<span id="L846" rel="#L846">846</span>
<span id="L847" rel="#L847">847</span>
<span id="L848" rel="#L848">848</span>
<span id="L849" rel="#L849">849</span>
<span id="L850" rel="#L850">850</span>
<span id="L851" rel="#L851">851</span>
<span id="L852" rel="#L852">852</span>
<span id="L853" rel="#L853">853</span>
<span id="L854" rel="#L854">854</span>
<span id="L855" rel="#L855">855</span>
<span id="L856" rel="#L856">856</span>
<span id="L857" rel="#L857">857</span>
<span id="L858" rel="#L858">858</span>
<span id="L859" rel="#L859">859</span>
<span id="L860" rel="#L860">860</span>
<span id="L861" rel="#L861">861</span>
<span id="L862" rel="#L862">862</span>
<span id="L863" rel="#L863">863</span>
<span id="L864" rel="#L864">864</span>
<span id="L865" rel="#L865">865</span>
<span id="L866" rel="#L866">866</span>
<span id="L867" rel="#L867">867</span>
<span id="L868" rel="#L868">868</span>
<span id="L869" rel="#L869">869</span>
<span id="L870" rel="#L870">870</span>
<span id="L871" rel="#L871">871</span>
<span id="L872" rel="#L872">872</span>
<span id="L873" rel="#L873">873</span>
<span id="L874" rel="#L874">874</span>
<span id="L875" rel="#L875">875</span>
<span id="L876" rel="#L876">876</span>
<span id="L877" rel="#L877">877</span>
<span id="L878" rel="#L878">878</span>
<span id="L879" rel="#L879">879</span>
<span id="L880" rel="#L880">880</span>
<span id="L881" rel="#L881">881</span>
<span id="L882" rel="#L882">882</span>
<span id="L883" rel="#L883">883</span>
<span id="L884" rel="#L884">884</span>
<span id="L885" rel="#L885">885</span>
<span id="L886" rel="#L886">886</span>
<span id="L887" rel="#L887">887</span>
<span id="L888" rel="#L888">888</span>
<span id="L889" rel="#L889">889</span>
<span id="L890" rel="#L890">890</span>
<span id="L891" rel="#L891">891</span>
<span id="L892" rel="#L892">892</span>
<span id="L893" rel="#L893">893</span>
<span id="L894" rel="#L894">894</span>
<span id="L895" rel="#L895">895</span>
<span id="L896" rel="#L896">896</span>
<span id="L897" rel="#L897">897</span>
<span id="L898" rel="#L898">898</span>
<span id="L899" rel="#L899">899</span>
<span id="L900" rel="#L900">900</span>
<span id="L901" rel="#L901">901</span>
<span id="L902" rel="#L902">902</span>
<span id="L903" rel="#L903">903</span>
<span id="L904" rel="#L904">904</span>
<span id="L905" rel="#L905">905</span>
<span id="L906" rel="#L906">906</span>
<span id="L907" rel="#L907">907</span>
<span id="L908" rel="#L908">908</span>
<span id="L909" rel="#L909">909</span>
<span id="L910" rel="#L910">910</span>
<span id="L911" rel="#L911">911</span>
<span id="L912" rel="#L912">912</span>
<span id="L913" rel="#L913">913</span>
<span id="L914" rel="#L914">914</span>
<span id="L915" rel="#L915">915</span>
<span id="L916" rel="#L916">916</span>
<span id="L917" rel="#L917">917</span>
<span id="L918" rel="#L918">918</span>
<span id="L919" rel="#L919">919</span>
<span id="L920" rel="#L920">920</span>
<span id="L921" rel="#L921">921</span>
<span id="L922" rel="#L922">922</span>
<span id="L923" rel="#L923">923</span>
<span id="L924" rel="#L924">924</span>
<span id="L925" rel="#L925">925</span>
<span id="L926" rel="#L926">926</span>
<span id="L927" rel="#L927">927</span>
<span id="L928" rel="#L928">928</span>
<span id="L929" rel="#L929">929</span>
<span id="L930" rel="#L930">930</span>
<span id="L931" rel="#L931">931</span>
<span id="L932" rel="#L932">932</span>
<span id="L933" rel="#L933">933</span>
<span id="L934" rel="#L934">934</span>
<span id="L935" rel="#L935">935</span>
<span id="L936" rel="#L936">936</span>
<span id="L937" rel="#L937">937</span>
<span id="L938" rel="#L938">938</span>
<span id="L939" rel="#L939">939</span>
<span id="L940" rel="#L940">940</span>
<span id="L941" rel="#L941">941</span>
<span id="L942" rel="#L942">942</span>
<span id="L943" rel="#L943">943</span>
<span id="L944" rel="#L944">944</span>
<span id="L945" rel="#L945">945</span>
<span id="L946" rel="#L946">946</span>
<span id="L947" rel="#L947">947</span>
<span id="L948" rel="#L948">948</span>
<span id="L949" rel="#L949">949</span>
<span id="L950" rel="#L950">950</span>
<span id="L951" rel="#L951">951</span>
<span id="L952" rel="#L952">952</span>
<span id="L953" rel="#L953">953</span>
<span id="L954" rel="#L954">954</span>
<span id="L955" rel="#L955">955</span>
<span id="L956" rel="#L956">956</span>
<span id="L957" rel="#L957">957</span>
<span id="L958" rel="#L958">958</span>
<span id="L959" rel="#L959">959</span>
<span id="L960" rel="#L960">960</span>
<span id="L961" rel="#L961">961</span>
<span id="L962" rel="#L962">962</span>
<span id="L963" rel="#L963">963</span>
<span id="L964" rel="#L964">964</span>
<span id="L965" rel="#L965">965</span>
<span id="L966" rel="#L966">966</span>
<span id="L967" rel="#L967">967</span>
<span id="L968" rel="#L968">968</span>
<span id="L969" rel="#L969">969</span>
<span id="L970" rel="#L970">970</span>
<span id="L971" rel="#L971">971</span>
<span id="L972" rel="#L972">972</span>
<span id="L973" rel="#L973">973</span>
<span id="L974" rel="#L974">974</span>
<span id="L975" rel="#L975">975</span>
<span id="L976" rel="#L976">976</span>
<span id="L977" rel="#L977">977</span>
<span id="L978" rel="#L978">978</span>
<span id="L979" rel="#L979">979</span>
</pre>
          </td>
          <td width="100%">
                  <div class="highlight"><pre><div class='line' id='LC1'><span class="cm">/* =========================================================</span></div><div class='line' id='LC2'><span class="cm"> * bootstrap-datepicker.js</span></div><div class='line' id='LC3'><span class="cm"> * http://www.eyecon.ro/bootstrap-datepicker</span></div><div class='line' id='LC4'><span class="cm"> * =========================================================</span></div><div class='line' id='LC5'><span class="cm"> * Copyright 2012 Stefan Petre</span></div><div class='line' id='LC6'><span class="cm"> * Improvements by Andrew Rowls</span></div><div class='line' id='LC7'><span class="cm"> *</span></div><div class='line' id='LC8'><span class="cm"> * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);</span></div><div class='line' id='LC9'><span class="cm"> * you may not use this file except in compliance with the License.</span></div><div class='line' id='LC10'><span class="cm"> * You may obtain a copy of the License at</span></div><div class='line' id='LC11'><span class="cm"> *</span></div><div class='line' id='LC12'><span class="cm"> * http://www.apache.org/licenses/LICENSE-2.0</span></div><div class='line' id='LC13'><span class="cm"> *</span></div><div class='line' id='LC14'><span class="cm"> * Unless required by applicable law or agreed to in writing, software</span></div><div class='line' id='LC15'><span class="cm"> * distributed under the License is distributed on an &quot;AS IS&quot; BASIS,</span></div><div class='line' id='LC16'><span class="cm"> * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span></div><div class='line' id='LC17'><span class="cm"> * See the License for the specific language governing permissions and</span></div><div class='line' id='LC18'><span class="cm"> * limitations under the License.</span></div><div class='line' id='LC19'><span class="cm"> * ========================================================= */</span></div><div class='line' id='LC20'><br/></div><div class='line' id='LC21'><span class="o">!</span><span class="kd">function</span><span class="p">(</span> <span class="nx">$</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC22'><br/></div><div class='line' id='LC23'>	<span class="kd">function</span> <span class="nx">UTCDate</span><span class="p">(){</span></div><div class='line' id='LC24'>		<span class="k">return</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="nb">Date</span><span class="p">.</span><span class="nx">UTC</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="nb">Date</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">));</span></div><div class='line' id='LC25'>	<span class="p">}</span></div><div class='line' id='LC26'>	<span class="kd">function</span> <span class="nx">UTCToday</span><span class="p">(){</span></div><div class='line' id='LC27'>		<span class="kd">var</span> <span class="nx">today</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">();</span></div><div class='line' id='LC28'>		<span class="k">return</span> <span class="nx">UTCDate</span><span class="p">(</span><span class="nx">today</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">(),</span> <span class="nx">today</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">(),</span> <span class="nx">today</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">());</span></div><div class='line' id='LC29'>	<span class="p">}</span></div><div class='line' id='LC30'><br/></div><div class='line' id='LC31'>	<span class="c1">// Picker object</span></div><div class='line' id='LC32'><br/></div><div class='line' id='LC33'>	<span class="kd">var</span> <span class="nx">Datepicker</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">element</span><span class="p">,</span> <span class="nx">options</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC34'>		<span class="kd">var</span> <span class="nx">that</span> <span class="o">=</span> <span class="k">this</span><span class="p">;</span></div><div class='line' id='LC35'><br/></div><div class='line' id='LC36'>		<span class="k">this</span><span class="p">.</span><span class="nx">element</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC37'>		<span class="k">this</span><span class="p">.</span><span class="nx">language</span> <span class="o">=</span> <span class="nx">options</span><span class="p">.</span><span class="nx">language</span><span class="o">||</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-language&#39;</span><span class="p">)</span><span class="o">||</span><span class="s2">&quot;en&quot;</span><span class="p">;</span></div><div class='line' id='LC38'>		<span class="k">this</span><span class="p">.</span><span class="nx">language</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">language</span> <span class="k">in</span> <span class="nx">dates</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">language</span> <span class="o">:</span> <span class="s2">&quot;en&quot;</span><span class="p">;</span></div><div class='line' id='LC39'>		<span class="k">this</span><span class="p">.</span><span class="nx">isRTL</span> <span class="o">=</span> <span class="nx">dates</span><span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">].</span><span class="nx">rtl</span><span class="o">||</span><span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC40'>		<span class="k">this</span><span class="p">.</span><span class="nx">format</span> <span class="o">=</span> <span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">parseFormat</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">format</span><span class="o">||</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-format&#39;</span><span class="p">)</span><span class="o">||</span><span class="nx">dates</span><span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">].</span><span class="nx">format</span><span class="o">||</span><span class="s1">&#39;mm/dd/yyyy&#39;</span><span class="p">);</span></div><div class='line' id='LC41'>		<span class="k">this</span><span class="p">.</span><span class="nx">isInline</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC42'>		<span class="k">this</span><span class="p">.</span><span class="nx">isInput</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;input&#39;</span><span class="p">);</span></div><div class='line' id='LC43'>		<span class="k">this</span><span class="p">.</span><span class="nx">component</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;.date&#39;</span><span class="p">)</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.add-on&#39;</span><span class="p">)</span> <span class="o">:</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC44'>		<span class="k">this</span><span class="p">.</span><span class="nx">hasInput</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">component</span> <span class="o">&amp;&amp;</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;input&#39;</span><span class="p">).</span><span class="nx">length</span><span class="p">;</span></div><div class='line' id='LC45'>		<span class="k">if</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">component</span> <span class="o">&amp;&amp;</span> <span class="k">this</span><span class="p">.</span><span class="nx">component</span><span class="p">.</span><span class="nx">length</span> <span class="o">===</span> <span class="mi">0</span><span class="p">)</span></div><div class='line' id='LC46'>			<span class="k">this</span><span class="p">.</span><span class="nx">component</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC47'><br/></div><div class='line' id='LC48'>		<span class="k">this</span><span class="p">.</span><span class="nx">_attachEvents</span><span class="p">();</span></div><div class='line' id='LC49'><br/></div><div class='line' id='LC50'>		<span class="k">this</span><span class="p">.</span><span class="nx">forceParse</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC51'>		<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;forceParse&#39;</span> <span class="k">in</span> <span class="nx">options</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC52'>			<span class="k">this</span><span class="p">.</span><span class="nx">forceParse</span> <span class="o">=</span> <span class="nx">options</span><span class="p">.</span><span class="nx">forceParse</span><span class="p">;</span></div><div class='line' id='LC53'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="s1">&#39;dateForceParse&#39;</span> <span class="k">in</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC54'>			<span class="k">this</span><span class="p">.</span><span class="nx">forceParse</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-force-parse&#39;</span><span class="p">);</span></div><div class='line' id='LC55'>		<span class="p">}</span></div><div class='line' id='LC56'><br/></div><div class='line' id='LC57'><br/></div><div class='line' id='LC58'>		<span class="k">this</span><span class="p">.</span><span class="nx">picker</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">template</span><span class="p">)</span></div><div class='line' id='LC59'>							<span class="p">.</span><span class="nx">appendTo</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isInline</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span> <span class="o">:</span> <span class="s1">&#39;body&#39;</span><span class="p">)</span></div><div class='line' id='LC60'>							<span class="p">.</span><span class="nx">on</span><span class="p">({</span></div><div class='line' id='LC61'>								<span class="nx">click</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">click</span><span class="p">,</span> <span class="k">this</span><span class="p">),</span></div><div class='line' id='LC62'>								<span class="nx">mousedown</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">mousedown</span><span class="p">,</span> <span class="k">this</span><span class="p">)</span></div><div class='line' id='LC63'>							<span class="p">});</span></div><div class='line' id='LC64'><br/></div><div class='line' id='LC65'>		<span class="k">if</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isInline</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC66'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s1">&#39;datepicker-inline&#39;</span><span class="p">);</span></div><div class='line' id='LC67'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC68'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s1">&#39;datepicker-dropdown dropdown-menu&#39;</span><span class="p">);</span></div><div class='line' id='LC69'>		<span class="p">}</span></div><div class='line' id='LC70'>		<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isRTL</span><span class="p">){</span></div><div class='line' id='LC71'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s1">&#39;datepicker-rtl&#39;</span><span class="p">);</span></div><div class='line' id='LC72'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.prev i, .next i&#39;</span><span class="p">)</span></div><div class='line' id='LC73'>						<span class="p">.</span><span class="nx">toggleClass</span><span class="p">(</span><span class="s1">&#39;icon-arrow-left icon-arrow-right&#39;</span><span class="p">);</span></div><div class='line' id='LC74'>		<span class="p">}</span></div><div class='line' id='LC75'>		<span class="nx">$</span><span class="p">(</span><span class="nb">document</span><span class="p">).</span><span class="nx">on</span><span class="p">(</span><span class="s1">&#39;mousedown&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC76'>			<span class="c1">// Clicked outside the datepicker, hide it</span></div><div class='line' id='LC77'>			<span class="k">if</span> <span class="p">(</span><span class="nx">$</span><span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">target</span><span class="p">).</span><span class="nx">closest</span><span class="p">(</span><span class="s1">&#39;.datepicker.datepicker-inline, .datepicker.datepicker-dropdown&#39;</span><span class="p">).</span><span class="nx">length</span> <span class="o">===</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC78'>				<span class="nx">that</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC79'>			<span class="p">}</span></div><div class='line' id='LC80'>		<span class="p">});</span></div><div class='line' id='LC81'><br/></div><div class='line' id='LC82'>		<span class="k">this</span><span class="p">.</span><span class="nx">autoclose</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC83'>		<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;autoclose&#39;</span> <span class="k">in</span> <span class="nx">options</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC84'>			<span class="k">this</span><span class="p">.</span><span class="nx">autoclose</span> <span class="o">=</span> <span class="nx">options</span><span class="p">.</span><span class="nx">autoclose</span><span class="p">;</span></div><div class='line' id='LC85'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="s1">&#39;dateAutoclose&#39;</span> <span class="k">in</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC86'>			<span class="k">this</span><span class="p">.</span><span class="nx">autoclose</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-autoclose&#39;</span><span class="p">);</span></div><div class='line' id='LC87'>		<span class="p">}</span></div><div class='line' id='LC88'><br/></div><div class='line' id='LC89'>		<span class="k">this</span><span class="p">.</span><span class="nx">keyboardNavigation</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC90'>		<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;keyboardNavigation&#39;</span> <span class="k">in</span> <span class="nx">options</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC91'>			<span class="k">this</span><span class="p">.</span><span class="nx">keyboardNavigation</span> <span class="o">=</span> <span class="nx">options</span><span class="p">.</span><span class="nx">keyboardNavigation</span><span class="p">;</span></div><div class='line' id='LC92'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="s1">&#39;dateKeyboardNavigation&#39;</span> <span class="k">in</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC93'>			<span class="k">this</span><span class="p">.</span><span class="nx">keyboardNavigation</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-keyboard-navigation&#39;</span><span class="p">);</span></div><div class='line' id='LC94'>		<span class="p">}</span></div><div class='line' id='LC95'><br/></div><div class='line' id='LC96'>		<span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startViewMode</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC97'>		<span class="k">switch</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">startView</span> <span class="o">||</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-start-view&#39;</span><span class="p">)){</span></div><div class='line' id='LC98'>			<span class="k">case</span> <span class="mi">2</span><span class="o">:</span></div><div class='line' id='LC99'>			<span class="k">case</span> <span class="s1">&#39;decade&#39;</span><span class="o">:</span></div><div class='line' id='LC100'>				<span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startViewMode</span> <span class="o">=</span> <span class="mi">2</span><span class="p">;</span></div><div class='line' id='LC101'>				<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC102'>			<span class="k">case</span> <span class="mi">1</span><span class="o">:</span></div><div class='line' id='LC103'>			<span class="k">case</span> <span class="s1">&#39;year&#39;</span><span class="o">:</span></div><div class='line' id='LC104'>				<span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startViewMode</span> <span class="o">=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC105'>				<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC106'>		<span class="p">}</span></div><div class='line' id='LC107'><br/></div><div class='line' id='LC108'>		<span class="k">this</span><span class="p">.</span><span class="nx">todayBtn</span> <span class="o">=</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">todayBtn</span><span class="o">||</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-today-btn&#39;</span><span class="p">)</span><span class="o">||</span><span class="kc">false</span><span class="p">);</span></div><div class='line' id='LC109'>		<span class="k">this</span><span class="p">.</span><span class="nx">todayHighlight</span> <span class="o">=</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">todayHighlight</span><span class="o">||</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-today-highlight&#39;</span><span class="p">)</span><span class="o">||</span><span class="kc">false</span><span class="p">);</span></div><div class='line' id='LC110'><br/></div><div class='line' id='LC111'>		<span class="k">this</span><span class="p">.</span><span class="nx">calendarWeeks</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC112'>		<span class="k">if</span> <span class="p">(</span><span class="s1">&#39;calendarWeeks&#39;</span> <span class="k">in</span> <span class="nx">options</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC113'>			<span class="k">this</span><span class="p">.</span><span class="nx">calendarWeeks</span> <span class="o">=</span> <span class="nx">options</span><span class="p">.</span><span class="nx">calendarWeeks</span><span class="p">;</span></div><div class='line' id='LC114'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="s1">&#39;dateCalendarWeeks&#39;</span> <span class="k">in</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC115'>			<span class="k">this</span><span class="p">.</span><span class="nx">calendarWeeks</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-calendar-weeks&#39;</span><span class="p">);</span></div><div class='line' id='LC116'>		<span class="p">}</span></div><div class='line' id='LC117'>		<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">calendarWeeks</span><span class="p">)</span></div><div class='line' id='LC118'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;tfoot th.today&#39;</span><span class="p">)</span></div><div class='line' id='LC119'>						<span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;colspan&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">i</span><span class="p">,</span> <span class="nx">val</span><span class="p">){</span></div><div class='line' id='LC120'>							<span class="k">return</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">val</span><span class="p">)</span> <span class="o">+</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC121'>						<span class="p">});</span></div><div class='line' id='LC122'><br/></div><div class='line' id='LC123'>		<span class="k">this</span><span class="p">.</span><span class="nx">weekStart</span> <span class="o">=</span> <span class="p">((</span><span class="nx">options</span><span class="p">.</span><span class="nx">weekStart</span><span class="o">||</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-weekstart&#39;</span><span class="p">)</span><span class="o">||</span><span class="nx">dates</span><span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">].</span><span class="nx">weekStart</span><span class="o">||</span><span class="mi">0</span><span class="p">)</span> <span class="o">%</span> <span class="mi">7</span><span class="p">);</span></div><div class='line' id='LC124'>		<span class="k">this</span><span class="p">.</span><span class="nx">weekEnd</span> <span class="o">=</span> <span class="p">((</span><span class="k">this</span><span class="p">.</span><span class="nx">weekStart</span> <span class="o">+</span> <span class="mi">6</span><span class="p">)</span> <span class="o">%</span> <span class="mi">7</span><span class="p">);</span></div><div class='line' id='LC125'>		<span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">=</span> <span class="o">-</span><span class="kc">Infinity</span><span class="p">;</span></div><div class='line' id='LC126'>		<span class="k">this</span><span class="p">.</span><span class="nx">endDate</span> <span class="o">=</span> <span class="kc">Infinity</span><span class="p">;</span></div><div class='line' id='LC127'>		<span class="k">this</span><span class="p">.</span><span class="nx">daysOfWeekDisabled</span> <span class="o">=</span> <span class="p">[];</span></div><div class='line' id='LC128'>		<span class="k">this</span><span class="p">.</span><span class="nx">setStartDate</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">startDate</span><span class="o">||</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-startdate&#39;</span><span class="p">));</span></div><div class='line' id='LC129'>		<span class="k">this</span><span class="p">.</span><span class="nx">setEndDate</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">endDate</span><span class="o">||</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-enddate&#39;</span><span class="p">));</span></div><div class='line' id='LC130'>		<span class="k">this</span><span class="p">.</span><span class="nx">setDaysOfWeekDisabled</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">daysOfWeekDisabled</span><span class="o">||</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date-days-of-week-disabled&#39;</span><span class="p">));</span></div><div class='line' id='LC131'>		<span class="k">this</span><span class="p">.</span><span class="nx">fillDow</span><span class="p">();</span></div><div class='line' id='LC132'>		<span class="k">this</span><span class="p">.</span><span class="nx">fillMonths</span><span class="p">();</span></div><div class='line' id='LC133'>		<span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">();</span></div><div class='line' id='LC134'>		<span class="k">this</span><span class="p">.</span><span class="nx">showMode</span><span class="p">();</span></div><div class='line' id='LC135'><br/></div><div class='line' id='LC136'>		<span class="k">if</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isInline</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC137'>			<span class="k">this</span><span class="p">.</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC138'>		<span class="p">}</span></div><div class='line' id='LC139'>	<span class="p">};</span></div><div class='line' id='LC140'><br/></div><div class='line' id='LC141'>	<span class="nx">Datepicker</span><span class="p">.</span><span class="nx">prototype</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC142'>		<span class="nx">constructor</span><span class="o">:</span> <span class="nx">Datepicker</span><span class="p">,</span></div><div class='line' id='LC143'><br/></div><div class='line' id='LC144'>		<span class="nx">_events</span><span class="o">:</span> <span class="p">[],</span></div><div class='line' id='LC145'>		<span class="nx">_attachEvents</span><span class="o">:</span> <span class="kd">function</span><span class="p">(){</span></div><div class='line' id='LC146'>			<span class="k">this</span><span class="p">.</span><span class="nx">_detachEvents</span><span class="p">();</span></div><div class='line' id='LC147'>			<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isInput</span><span class="p">)</span> <span class="p">{</span> <span class="c1">// single input</span></div><div class='line' id='LC148'>				<span class="k">this</span><span class="p">.</span><span class="nx">_events</span> <span class="o">=</span> <span class="p">[</span></div><div class='line' id='LC149'>					<span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">,</span> <span class="p">{</span></div><div class='line' id='LC150'>						<span class="nx">focus</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">show</span><span class="p">,</span> <span class="k">this</span><span class="p">),</span></div><div class='line' id='LC151'>						<span class="nx">keyup</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">,</span> <span class="k">this</span><span class="p">),</span></div><div class='line' id='LC152'>						<span class="nx">keydown</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">keydown</span><span class="p">,</span> <span class="k">this</span><span class="p">)</span></div><div class='line' id='LC153'>					<span class="p">}]</span></div><div class='line' id='LC154'>				<span class="p">];</span></div><div class='line' id='LC155'>			<span class="p">}</span></div><div class='line' id='LC156'>			<span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">component</span> <span class="o">&amp;&amp;</span> <span class="k">this</span><span class="p">.</span><span class="nx">hasInput</span><span class="p">){</span> <span class="c1">// component: input + button</span></div><div class='line' id='LC157'>				<span class="k">this</span><span class="p">.</span><span class="nx">_events</span> <span class="o">=</span> <span class="p">[</span></div><div class='line' id='LC158'>					<span class="c1">// For components that are not readonly, allow keyboard nav</span></div><div class='line' id='LC159'>					<span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;input&#39;</span><span class="p">),</span> <span class="p">{</span></div><div class='line' id='LC160'>						<span class="nx">focus</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">show</span><span class="p">,</span> <span class="k">this</span><span class="p">),</span></div><div class='line' id='LC161'>						<span class="nx">keyup</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">,</span> <span class="k">this</span><span class="p">),</span></div><div class='line' id='LC162'>						<span class="nx">keydown</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">keydown</span><span class="p">,</span> <span class="k">this</span><span class="p">)</span></div><div class='line' id='LC163'>					<span class="p">}],</span></div><div class='line' id='LC164'>					<span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">component</span><span class="p">,</span> <span class="p">{</span></div><div class='line' id='LC165'>						<span class="nx">click</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">show</span><span class="p">,</span> <span class="k">this</span><span class="p">)</span></div><div class='line' id='LC166'>					<span class="p">}]</span></div><div class='line' id='LC167'>				<span class="p">];</span></div><div class='line' id='LC168'>			<span class="p">}</span></div><div class='line' id='LC169'>						<span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;div&#39;</span><span class="p">))</span> <span class="p">{</span>  <span class="c1">// inline datepicker</span></div><div class='line' id='LC170'>							<span class="k">this</span><span class="p">.</span><span class="nx">isInline</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC171'>						<span class="p">}</span></div><div class='line' id='LC172'>			<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC173'>				<span class="k">this</span><span class="p">.</span><span class="nx">_events</span> <span class="o">=</span> <span class="p">[</span></div><div class='line' id='LC174'>					<span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">,</span> <span class="p">{</span></div><div class='line' id='LC175'>						<span class="nx">click</span><span class="o">:</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">show</span><span class="p">,</span> <span class="k">this</span><span class="p">)</span></div><div class='line' id='LC176'>					<span class="p">}]</span></div><div class='line' id='LC177'>				<span class="p">];</span></div><div class='line' id='LC178'>			<span class="p">}</span></div><div class='line' id='LC179'>			<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="nx">el</span><span class="p">,</span> <span class="nx">ev</span><span class="p">;</span> <span class="nx">i</span><span class="o">&lt;</span><span class="k">this</span><span class="p">.</span><span class="nx">_events</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">){</span></div><div class='line' id='LC180'>				<span class="nx">el</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">_events</span><span class="p">[</span><span class="nx">i</span><span class="p">][</span><span class="mi">0</span><span class="p">];</span></div><div class='line' id='LC181'>				<span class="nx">ev</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">_events</span><span class="p">[</span><span class="nx">i</span><span class="p">][</span><span class="mi">1</span><span class="p">];</span></div><div class='line' id='LC182'>				<span class="nx">el</span><span class="p">.</span><span class="nx">on</span><span class="p">(</span><span class="nx">ev</span><span class="p">);</span></div><div class='line' id='LC183'>			<span class="p">}</span></div><div class='line' id='LC184'>		<span class="p">},</span></div><div class='line' id='LC185'>		<span class="nx">_detachEvents</span><span class="o">:</span> <span class="kd">function</span><span class="p">(){</span></div><div class='line' id='LC186'>			<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="nx">el</span><span class="p">,</span> <span class="nx">ev</span><span class="p">;</span> <span class="nx">i</span><span class="o">&lt;</span><span class="k">this</span><span class="p">.</span><span class="nx">_events</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">){</span></div><div class='line' id='LC187'>				<span class="nx">el</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">_events</span><span class="p">[</span><span class="nx">i</span><span class="p">][</span><span class="mi">0</span><span class="p">];</span></div><div class='line' id='LC188'>				<span class="nx">ev</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">_events</span><span class="p">[</span><span class="nx">i</span><span class="p">][</span><span class="mi">1</span><span class="p">];</span></div><div class='line' id='LC189'>				<span class="nx">el</span><span class="p">.</span><span class="nx">off</span><span class="p">(</span><span class="nx">ev</span><span class="p">);</span></div><div class='line' id='LC190'>			<span class="p">}</span></div><div class='line' id='LC191'>			<span class="k">this</span><span class="p">.</span><span class="nx">_events</span> <span class="o">=</span> <span class="p">[];</span></div><div class='line' id='LC192'>		<span class="p">},</span></div><div class='line' id='LC193'><br/></div><div class='line' id='LC194'>		<span class="nx">show</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC195'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC196'>			<span class="k">this</span><span class="p">.</span><span class="nx">height</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">component</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">component</span><span class="p">.</span><span class="nx">outerHeight</span><span class="p">()</span> <span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">outerHeight</span><span class="p">();</span></div><div class='line' id='LC197'>			<span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">();</span></div><div class='line' id='LC198'>			<span class="k">this</span><span class="p">.</span><span class="nx">place</span><span class="p">();</span></div><div class='line' id='LC199'>			<span class="nx">$</span><span class="p">(</span><span class="nb">window</span><span class="p">).</span><span class="nx">on</span><span class="p">(</span><span class="s1">&#39;resize&#39;</span><span class="p">,</span> <span class="nx">$</span><span class="p">.</span><span class="nx">proxy</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">place</span><span class="p">,</span> <span class="k">this</span><span class="p">));</span></div><div class='line' id='LC200'>			<span class="k">if</span> <span class="p">(</span><span class="nx">e</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC201'>				<span class="nx">e</span><span class="p">.</span><span class="nx">stopPropagation</span><span class="p">();</span></div><div class='line' id='LC202'>				<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC203'>			<span class="p">}</span></div><div class='line' id='LC204'>			<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">trigger</span><span class="p">({</span></div><div class='line' id='LC205'>				<span class="nx">type</span><span class="o">:</span> <span class="s1">&#39;show&#39;</span><span class="p">,</span></div><div class='line' id='LC206'>				<span class="nx">date</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">date</span></div><div class='line' id='LC207'>			<span class="p">});</span></div><div class='line' id='LC208'>		<span class="p">},</span></div><div class='line' id='LC209'><br/></div><div class='line' id='LC210'>		<span class="nx">hide</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">){</span></div><div class='line' id='LC211'>			<span class="k">if</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isInline</span><span class="p">)</span> <span class="k">return</span><span class="p">;</span></div><div class='line' id='LC212'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;:visible&#39;</span><span class="p">))</span> <span class="k">return</span><span class="p">;</span></div><div class='line' id='LC213'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC214'>			<span class="nx">$</span><span class="p">(</span><span class="nb">window</span><span class="p">).</span><span class="nx">off</span><span class="p">(</span><span class="s1">&#39;resize&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">place</span><span class="p">);</span></div><div class='line' id='LC215'>			<span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startViewMode</span><span class="p">;</span></div><div class='line' id='LC216'>			<span class="k">this</span><span class="p">.</span><span class="nx">showMode</span><span class="p">();</span></div><div class='line' id='LC217'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="k">this</span><span class="p">.</span><span class="nx">isInput</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC218'>				<span class="nx">$</span><span class="p">(</span><span class="nb">document</span><span class="p">).</span><span class="nx">off</span><span class="p">(</span><span class="s1">&#39;mousedown&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">hide</span><span class="p">);</span></div><div class='line' id='LC219'>			<span class="p">}</span></div><div class='line' id='LC220'><br/></div><div class='line' id='LC221'>			<span class="k">if</span> <span class="p">(</span></div><div class='line' id='LC222'>				<span class="k">this</span><span class="p">.</span><span class="nx">forceParse</span> <span class="o">&amp;&amp;</span></div><div class='line' id='LC223'>				<span class="p">(</span></div><div class='line' id='LC224'>					<span class="k">this</span><span class="p">.</span><span class="nx">isInput</span> <span class="o">&amp;&amp;</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">val</span><span class="p">()</span> <span class="o">||</span></div><div class='line' id='LC225'>					<span class="k">this</span><span class="p">.</span><span class="nx">hasInput</span> <span class="o">&amp;&amp;</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;input&#39;</span><span class="p">).</span><span class="nx">val</span><span class="p">()</span></div><div class='line' id='LC226'>				<span class="p">)</span></div><div class='line' id='LC227'>			<span class="p">)</span></div><div class='line' id='LC228'>				<span class="k">this</span><span class="p">.</span><span class="nx">setValue</span><span class="p">();</span></div><div class='line' id='LC229'>			<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">trigger</span><span class="p">({</span></div><div class='line' id='LC230'>				<span class="nx">type</span><span class="o">:</span> <span class="s1">&#39;hide&#39;</span><span class="p">,</span></div><div class='line' id='LC231'>				<span class="nx">date</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">date</span></div><div class='line' id='LC232'>			<span class="p">});</span></div><div class='line' id='LC233'>		<span class="p">},</span></div><div class='line' id='LC234'><br/></div><div class='line' id='LC235'>		<span class="nx">remove</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC236'>			<span class="k">this</span><span class="p">.</span><span class="nx">_detachEvents</span><span class="p">();</span></div><div class='line' id='LC237'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC238'>			<span class="k">delete</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">().</span><span class="nx">datepicker</span><span class="p">;</span></div><div class='line' id='LC239'>		<span class="p">},</span></div><div class='line' id='LC240'><br/></div><div class='line' id='LC241'>		<span class="nx">getDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC242'>			<span class="kd">var</span> <span class="nx">d</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">();</span></div><div class='line' id='LC243'>			<span class="k">return</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">getTime</span><span class="p">()</span> <span class="o">+</span> <span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">getTimezoneOffset</span><span class="p">()</span><span class="o">*</span><span class="mi">60000</span><span class="p">));</span></div><div class='line' id='LC244'>		<span class="p">},</span></div><div class='line' id='LC245'><br/></div><div class='line' id='LC246'>		<span class="nx">getUTCDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC247'>			<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">;</span></div><div class='line' id='LC248'>		<span class="p">},</span></div><div class='line' id='LC249'><br/></div><div class='line' id='LC250'>		<span class="nx">setDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC251'>			<span class="k">this</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">getTime</span><span class="p">()</span> <span class="o">-</span> <span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">getTimezoneOffset</span><span class="p">()</span><span class="o">*</span><span class="mi">60000</span><span class="p">)));</span></div><div class='line' id='LC252'>		<span class="p">},</span></div><div class='line' id='LC253'><br/></div><div class='line' id='LC254'>		<span class="nx">setUTCDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC255'>			<span class="k">this</span><span class="p">.</span><span class="nx">date</span> <span class="o">=</span> <span class="nx">d</span><span class="p">;</span></div><div class='line' id='LC256'>			<span class="k">this</span><span class="p">.</span><span class="nx">setValue</span><span class="p">();</span></div><div class='line' id='LC257'>		<span class="p">},</span></div><div class='line' id='LC258'><br/></div><div class='line' id='LC259'>		<span class="nx">setValue</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC260'>			<span class="kd">var</span> <span class="nx">formatted</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">getFormattedDate</span><span class="p">();</span></div><div class='line' id='LC261'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="k">this</span><span class="p">.</span><span class="nx">isInput</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC262'>				<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">component</span><span class="p">){</span></div><div class='line' id='LC263'>					<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;input&#39;</span><span class="p">).</span><span class="nx">val</span><span class="p">(</span><span class="nx">formatted</span><span class="p">);</span></div><div class='line' id='LC264'>				<span class="p">}</span></div><div class='line' id='LC265'>				<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date&#39;</span><span class="p">,</span> <span class="nx">formatted</span><span class="p">);</span></div><div class='line' id='LC266'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC267'>				<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">val</span><span class="p">(</span><span class="nx">formatted</span><span class="p">);</span></div><div class='line' id='LC268'>			<span class="p">}</span></div><div class='line' id='LC269'>		<span class="p">},</span></div><div class='line' id='LC270'><br/></div><div class='line' id='LC271'>		<span class="nx">getFormattedDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">format</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC272'>			<span class="k">if</span> <span class="p">(</span><span class="nx">format</span> <span class="o">===</span> <span class="kc">undefined</span><span class="p">)</span></div><div class='line' id='LC273'>				<span class="nx">format</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">format</span><span class="p">;</span></div><div class='line' id='LC274'>			<span class="k">return</span> <span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">formatDate</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">,</span> <span class="nx">format</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">);</span></div><div class='line' id='LC275'>		<span class="p">},</span></div><div class='line' id='LC276'><br/></div><div class='line' id='LC277'>		<span class="nx">setStartDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">startDate</span><span class="p">){</span></div><div class='line' id='LC278'>			<span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">=</span> <span class="nx">startDate</span><span class="o">||-</span><span class="kc">Infinity</span><span class="p">;</span></div><div class='line' id='LC279'>			<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">!==</span> <span class="o">-</span><span class="kc">Infinity</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC280'>				<span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">=</span> <span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">parseDate</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">startDate</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">format</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">);</span></div><div class='line' id='LC281'>			<span class="p">}</span></div><div class='line' id='LC282'>			<span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">();</span></div><div class='line' id='LC283'>			<span class="k">this</span><span class="p">.</span><span class="nx">updateNavArrows</span><span class="p">();</span></div><div class='line' id='LC284'>		<span class="p">},</span></div><div class='line' id='LC285'><br/></div><div class='line' id='LC286'>		<span class="nx">setEndDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">endDate</span><span class="p">){</span></div><div class='line' id='LC287'>			<span class="k">this</span><span class="p">.</span><span class="nx">endDate</span> <span class="o">=</span> <span class="nx">endDate</span><span class="o">||</span><span class="kc">Infinity</span><span class="p">;</span></div><div class='line' id='LC288'>			<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">endDate</span> <span class="o">!==</span> <span class="kc">Infinity</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC289'>				<span class="k">this</span><span class="p">.</span><span class="nx">endDate</span> <span class="o">=</span> <span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">parseDate</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">endDate</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">format</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">);</span></div><div class='line' id='LC290'>			<span class="p">}</span></div><div class='line' id='LC291'>			<span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">();</span></div><div class='line' id='LC292'>			<span class="k">this</span><span class="p">.</span><span class="nx">updateNavArrows</span><span class="p">();</span></div><div class='line' id='LC293'>		<span class="p">},</span></div><div class='line' id='LC294'><br/></div><div class='line' id='LC295'>		<span class="nx">setDaysOfWeekDisabled</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">daysOfWeekDisabled</span><span class="p">){</span></div><div class='line' id='LC296'>			<span class="k">this</span><span class="p">.</span><span class="nx">daysOfWeekDisabled</span> <span class="o">=</span> <span class="nx">daysOfWeekDisabled</span><span class="o">||</span><span class="p">[];</span></div><div class='line' id='LC297'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">$</span><span class="p">.</span><span class="nx">isArray</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">daysOfWeekDisabled</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC298'>				<span class="k">this</span><span class="p">.</span><span class="nx">daysOfWeekDisabled</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">daysOfWeekDisabled</span><span class="p">.</span><span class="nx">split</span><span class="p">(</span><span class="sr">/,\s*/</span><span class="p">);</span></div><div class='line' id='LC299'>			<span class="p">}</span></div><div class='line' id='LC300'>			<span class="k">this</span><span class="p">.</span><span class="nx">daysOfWeekDisabled</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">daysOfWeekDisabled</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC301'>				<span class="k">return</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span> <span class="mi">10</span><span class="p">);</span></div><div class='line' id='LC302'>			<span class="p">});</span></div><div class='line' id='LC303'>			<span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">();</span></div><div class='line' id='LC304'>			<span class="k">this</span><span class="p">.</span><span class="nx">updateNavArrows</span><span class="p">();</span></div><div class='line' id='LC305'>		<span class="p">},</span></div><div class='line' id='LC306'><br/></div><div class='line' id='LC307'>		<span class="nx">place</span><span class="o">:</span> <span class="kd">function</span><span class="p">(){</span></div><div class='line' id='LC308'>						<span class="k">if</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isInline</span><span class="p">)</span> <span class="k">return</span><span class="p">;</span></div><div class='line' id='LC309'>			<span class="kd">var</span> <span class="nx">zIndex</span> <span class="o">=</span> <span class="nb">parseInt</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">parents</span><span class="p">().</span><span class="nx">filter</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC310'>							<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">css</span><span class="p">(</span><span class="s1">&#39;z-index&#39;</span><span class="p">)</span> <span class="o">!=</span> <span class="s1">&#39;auto&#39;</span><span class="p">;</span></div><div class='line' id='LC311'>						<span class="p">}).</span><span class="nx">first</span><span class="p">().</span><span class="nx">css</span><span class="p">(</span><span class="s1">&#39;z-index&#39;</span><span class="p">))</span><span class="o">+</span><span class="mi">10</span><span class="p">;</span></div><div class='line' id='LC312'>			<span class="kd">var</span> <span class="nx">offset</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">component</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">component</span><span class="p">.</span><span class="nx">offset</span><span class="p">()</span> <span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">offset</span><span class="p">();</span></div><div class='line' id='LC313'>			<span class="kd">var</span> <span class="nx">height</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">component</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">component</span><span class="p">.</span><span class="nx">outerHeight</span><span class="p">(</span><span class="kc">true</span><span class="p">)</span> <span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">outerHeight</span><span class="p">(</span><span class="kc">true</span><span class="p">);</span></div><div class='line' id='LC314'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span></div><div class='line' id='LC315'>				<span class="nx">top</span><span class="o">:</span> <span class="nx">offset</span><span class="p">.</span><span class="nx">top</span> <span class="o">+</span> <span class="nx">height</span><span class="p">,</span></div><div class='line' id='LC316'>				<span class="nx">left</span><span class="o">:</span> <span class="nx">offset</span><span class="p">.</span><span class="nx">left</span><span class="p">,</span></div><div class='line' id='LC317'>				<span class="nx">zIndex</span><span class="o">:</span> <span class="nx">zIndex</span></div><div class='line' id='LC318'>			<span class="p">});</span></div><div class='line' id='LC319'>		<span class="p">},</span></div><div class='line' id='LC320'><br/></div><div class='line' id='LC321'>		<span class="nx">update</span><span class="o">:</span> <span class="kd">function</span><span class="p">(){</span></div><div class='line' id='LC322'>			<span class="kd">var</span> <span class="nx">date</span><span class="p">,</span> <span class="nx">fromArgs</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC323'>			<span class="k">if</span><span class="p">(</span><span class="nx">arguments</span> <span class="o">&amp;&amp;</span> <span class="nx">arguments</span><span class="p">.</span><span class="nx">length</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">arguments</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">===</span> <span class="s1">&#39;string&#39;</span> <span class="o">||</span> <span class="nx">arguments</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="k">instanceof</span> <span class="nb">Date</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC324'>				<span class="nx">date</span> <span class="o">=</span> <span class="nx">arguments</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span></div><div class='line' id='LC325'>				<span class="nx">fromArgs</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC326'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC327'>				<span class="nx">date</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">isInput</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">val</span><span class="p">()</span> <span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;date&#39;</span><span class="p">)</span> <span class="o">||</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;input&#39;</span><span class="p">).</span><span class="nx">val</span><span class="p">();</span></div><div class='line' id='LC328'>			<span class="p">}</span></div><div class='line' id='LC329'><br/></div><div class='line' id='LC330'>			<span class="k">this</span><span class="p">.</span><span class="nx">date</span> <span class="o">=</span> <span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">parseDate</span><span class="p">(</span><span class="nx">date</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">format</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">);</span></div><div class='line' id='LC331'><br/></div><div class='line' id='LC332'>			<span class="k">if</span><span class="p">(</span><span class="nx">fromArgs</span><span class="p">)</span> <span class="k">this</span><span class="p">.</span><span class="nx">setValue</span><span class="p">();</span></div><div class='line' id='LC333'><br/></div><div class='line' id='LC334'>			<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span> <span class="o">&lt;</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC335'>				<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">startDate</span><span class="p">);</span></div><div class='line' id='LC336'>			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span> <span class="o">&gt;</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC337'>				<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">endDate</span><span class="p">);</span></div><div class='line' id='LC338'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC339'>				<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">);</span></div><div class='line' id='LC340'>			<span class="p">}</span></div><div class='line' id='LC341'>			<span class="k">this</span><span class="p">.</span><span class="nx">fill</span><span class="p">();</span></div><div class='line' id='LC342'>		<span class="p">},</span></div><div class='line' id='LC343'><br/></div><div class='line' id='LC344'>		<span class="nx">fillDow</span><span class="o">:</span> <span class="kd">function</span><span class="p">(){</span></div><div class='line' id='LC345'>			<span class="kd">var</span> <span class="nx">dowCnt</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">weekStart</span><span class="p">,</span></div><div class='line' id='LC346'>			<span class="nx">html</span> <span class="o">=</span> <span class="s1">&#39;&lt;tr&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC347'>			<span class="k">if</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">calendarWeeks</span><span class="p">){</span></div><div class='line' id='LC348'>				<span class="kd">var</span> <span class="nx">cell</span> <span class="o">=</span> <span class="s1">&#39;&lt;th class=&quot;cw&quot;&gt;&amp;nbsp;&lt;/th&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC349'>				<span class="nx">html</span> <span class="o">+=</span> <span class="nx">cell</span><span class="p">;</span></div><div class='line' id='LC350'>				<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.datepicker-days thead tr:first-child&#39;</span><span class="p">).</span><span class="nx">prepend</span><span class="p">(</span><span class="nx">cell</span><span class="p">);</span></div><div class='line' id='LC351'>			<span class="p">}</span></div><div class='line' id='LC352'>			<span class="k">while</span> <span class="p">(</span><span class="nx">dowCnt</span> <span class="o">&lt;</span> <span class="k">this</span><span class="p">.</span><span class="nx">weekStart</span> <span class="o">+</span> <span class="mi">7</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC353'>				<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;th class=&quot;dow&quot;&gt;&#39;</span><span class="o">+</span><span class="nx">dates</span><span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">].</span><span class="nx">daysMin</span><span class="p">[(</span><span class="nx">dowCnt</span><span class="o">++</span><span class="p">)</span><span class="o">%</span><span class="mi">7</span><span class="p">]</span><span class="o">+</span><span class="s1">&#39;&lt;/th&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC354'>			<span class="p">}</span></div><div class='line' id='LC355'>			<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;/tr&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC356'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.datepicker-days thead&#39;</span><span class="p">).</span><span class="nx">append</span><span class="p">(</span><span class="nx">html</span><span class="p">);</span></div><div class='line' id='LC357'>		<span class="p">},</span></div><div class='line' id='LC358'><br/></div><div class='line' id='LC359'>		<span class="nx">fillMonths</span><span class="o">:</span> <span class="kd">function</span><span class="p">(){</span></div><div class='line' id='LC360'>			<span class="kd">var</span> <span class="nx">html</span> <span class="o">=</span> <span class="s1">&#39;&#39;</span><span class="p">,</span></div><div class='line' id='LC361'>			<span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC362'>			<span class="k">while</span> <span class="p">(</span><span class="nx">i</span> <span class="o">&lt;</span> <span class="mi">12</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC363'>				<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;span class=&quot;month&quot;&gt;&#39;</span><span class="o">+</span><span class="nx">dates</span><span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">].</span><span class="nx">monthsShort</span><span class="p">[</span><span class="nx">i</span><span class="o">++</span><span class="p">]</span><span class="o">+</span><span class="s1">&#39;&lt;/span&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC364'>			<span class="p">}</span></div><div class='line' id='LC365'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.datepicker-months td&#39;</span><span class="p">).</span><span class="nx">html</span><span class="p">(</span><span class="nx">html</span><span class="p">);</span></div><div class='line' id='LC366'>		<span class="p">},</span></div><div class='line' id='LC367'><br/></div><div class='line' id='LC368'>		<span class="nx">fill</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC369'>			<span class="kd">var</span> <span class="nx">d</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">),</span></div><div class='line' id='LC370'>				<span class="nx">year</span> <span class="o">=</span> <span class="nx">d</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">(),</span></div><div class='line' id='LC371'>				<span class="nx">month</span> <span class="o">=</span> <span class="nx">d</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">(),</span></div><div class='line' id='LC372'>				<span class="nx">startYear</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">!==</span> <span class="o">-</span><span class="kc">Infinity</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span> <span class="o">:</span> <span class="o">-</span><span class="kc">Infinity</span><span class="p">,</span></div><div class='line' id='LC373'>				<span class="nx">startMonth</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">!==</span> <span class="o">-</span><span class="kc">Infinity</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()</span> <span class="o">:</span> <span class="o">-</span><span class="kc">Infinity</span><span class="p">,</span></div><div class='line' id='LC374'>				<span class="nx">endYear</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span> <span class="o">!==</span> <span class="kc">Infinity</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span> <span class="o">:</span> <span class="kc">Infinity</span><span class="p">,</span></div><div class='line' id='LC375'>				<span class="nx">endMonth</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span> <span class="o">!==</span> <span class="kc">Infinity</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()</span> <span class="o">:</span> <span class="kc">Infinity</span><span class="p">,</span></div><div class='line' id='LC376'>				<span class="nx">currentDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">date</span> <span class="o">&amp;&amp;</span> <span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">.</span><span class="nx">valueOf</span><span class="p">(),</span></div><div class='line' id='LC377'>				<span class="nx">today</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">();</span></div><div class='line' id='LC378'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.datepicker-days thead th.switch&#39;</span><span class="p">)</span></div><div class='line' id='LC379'>						<span class="p">.</span><span class="nx">text</span><span class="p">(</span><span class="nx">dates</span><span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">].</span><span class="nx">months</span><span class="p">[</span><span class="nx">month</span><span class="p">]</span><span class="o">+</span><span class="s1">&#39; &#39;</span><span class="o">+</span><span class="nx">year</span><span class="p">);</span></div><div class='line' id='LC380'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;tfoot th.today&#39;</span><span class="p">)</span></div><div class='line' id='LC381'>						<span class="p">.</span><span class="nx">text</span><span class="p">(</span><span class="nx">dates</span><span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">language</span><span class="p">].</span><span class="nx">today</span><span class="p">)</span></div><div class='line' id='LC382'>						<span class="p">.</span><span class="nx">toggle</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">todayBtn</span> <span class="o">!==</span> <span class="kc">false</span><span class="p">);</span></div><div class='line' id='LC383'>			<span class="k">this</span><span class="p">.</span><span class="nx">updateNavArrows</span><span class="p">();</span></div><div class='line' id='LC384'>			<span class="k">this</span><span class="p">.</span><span class="nx">fillMonths</span><span class="p">();</span></div><div class='line' id='LC385'>			<span class="kd">var</span> <span class="nx">prevMonth</span> <span class="o">=</span> <span class="nx">UTCDate</span><span class="p">(</span><span class="nx">year</span><span class="p">,</span> <span class="nx">month</span><span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="mi">28</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">),</span></div><div class='line' id='LC386'>				<span class="nx">day</span> <span class="o">=</span> <span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">getDaysInMonth</span><span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">(),</span> <span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">());</span></div><div class='line' id='LC387'>			<span class="nx">prevMonth</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="nx">day</span><span class="p">);</span></div><div class='line' id='LC388'>			<span class="nx">prevMonth</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="nx">day</span> <span class="o">-</span> <span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCDay</span><span class="p">()</span> <span class="o">-</span> <span class="k">this</span><span class="p">.</span><span class="nx">weekStart</span> <span class="o">+</span> <span class="mi">7</span><span class="p">)</span><span class="o">%</span><span class="mi">7</span><span class="p">);</span></div><div class='line' id='LC389'>			<span class="kd">var</span> <span class="nx">nextMonth</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="nx">prevMonth</span><span class="p">);</span></div><div class='line' id='LC390'>			<span class="nx">nextMonth</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="nx">nextMonth</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">+</span> <span class="mi">42</span><span class="p">);</span></div><div class='line' id='LC391'>			<span class="nx">nextMonth</span> <span class="o">=</span> <span class="nx">nextMonth</span><span class="p">.</span><span class="nx">valueOf</span><span class="p">();</span></div><div class='line' id='LC392'>			<span class="kd">var</span> <span class="nx">html</span> <span class="o">=</span> <span class="p">[];</span></div><div class='line' id='LC393'>			<span class="kd">var</span> <span class="nx">clsName</span><span class="p">;</span></div><div class='line' id='LC394'>			<span class="k">while</span><span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">valueOf</span><span class="p">()</span> <span class="o">&lt;</span> <span class="nx">nextMonth</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC395'>				<span class="k">if</span> <span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCDay</span><span class="p">()</span> <span class="o">==</span> <span class="k">this</span><span class="p">.</span><span class="nx">weekStart</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC396'>					<span class="nx">html</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s1">&#39;&lt;tr&gt;&#39;</span><span class="p">);</span></div><div class='line' id='LC397'>					<span class="k">if</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">calendarWeeks</span><span class="p">){</span></div><div class='line' id='LC398'>						<span class="c1">// adapted from https://github.com/timrwood/moment/blob/master/moment.js#L128</span></div><div class='line' id='LC399'>						<span class="kd">var</span> <span class="nx">a</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">(),</span> <span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">(),</span> <span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">-</span> <span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getDay</span><span class="p">()</span> <span class="o">+</span> <span class="mi">10</span> <span class="o">-</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">weekStart</span> <span class="o">&amp;&amp;</span> <span class="k">this</span><span class="p">.</span><span class="nx">weekStart</span><span class="o">%</span><span class="mi">7</span> <span class="o">&lt;</span> <span class="mi">5</span> <span class="o">&amp;&amp;</span> <span class="mi">7</span><span class="p">)),</span></div><div class='line' id='LC400'>							<span class="nx">b</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="nx">a</span><span class="p">.</span><span class="nx">getFullYear</span><span class="p">(),</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">4</span><span class="p">),</span></div><div class='line' id='LC401'>							<span class="nx">calWeek</span> <span class="o">=</span>  <span class="o">~~</span><span class="p">((</span><span class="nx">a</span> <span class="o">-</span> <span class="nx">b</span><span class="p">)</span> <span class="o">/</span> <span class="mi">864</span><span class="nx">e5</span> <span class="o">/</span> <span class="mi">7</span> <span class="o">+</span> <span class="mf">1.5</span><span class="p">);</span></div><div class='line' id='LC402'>						<span class="nx">html</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s1">&#39;&lt;td class=&quot;cw&quot;&gt;&#39;</span><span class="o">+</span> <span class="nx">calWeek</span> <span class="o">+</span><span class="s1">&#39;&lt;/td&gt;&#39;</span><span class="p">);</span></div><div class='line' id='LC403'>					<span class="p">}</span></div><div class='line' id='LC404'>				<span class="p">}</span></div><div class='line' id='LC405'>				<span class="nx">clsName</span> <span class="o">=</span> <span class="s1">&#39;&#39;</span><span class="p">;</span></div><div class='line' id='LC406'>				<span class="k">if</span> <span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span> <span class="o">&lt;</span> <span class="nx">year</span> <span class="o">||</span> <span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span> <span class="o">==</span> <span class="nx">year</span> <span class="o">&amp;&amp;</span> <span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()</span> <span class="o">&lt;</span> <span class="nx">month</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC407'>					<span class="nx">clsName</span> <span class="o">+=</span> <span class="s1">&#39; old&#39;</span><span class="p">;</span></div><div class='line' id='LC408'>				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span> <span class="o">&gt;</span> <span class="nx">year</span> <span class="o">||</span> <span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span> <span class="o">==</span> <span class="nx">year</span> <span class="o">&amp;&amp;</span> <span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()</span> <span class="o">&gt;</span> <span class="nx">month</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC409'>					<span class="nx">clsName</span> <span class="o">+=</span> <span class="s1">&#39; new&#39;</span><span class="p">;</span></div><div class='line' id='LC410'>				<span class="p">}</span></div><div class='line' id='LC411'>				<span class="c1">// Compare internal UTC date with local today, not UTC today</span></div><div class='line' id='LC412'>				<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">todayHighlight</span> <span class="o">&amp;&amp;</span></div><div class='line' id='LC413'>					<span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span> <span class="o">==</span> <span class="nx">today</span><span class="p">.</span><span class="nx">getFullYear</span><span class="p">()</span> <span class="o">&amp;&amp;</span></div><div class='line' id='LC414'>					<span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()</span> <span class="o">==</span> <span class="nx">today</span><span class="p">.</span><span class="nx">getMonth</span><span class="p">()</span> <span class="o">&amp;&amp;</span></div><div class='line' id='LC415'>					<span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">==</span> <span class="nx">today</span><span class="p">.</span><span class="nx">getDate</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC416'>					<span class="nx">clsName</span> <span class="o">+=</span> <span class="s1">&#39; today&#39;</span><span class="p">;</span></div><div class='line' id='LC417'>				<span class="p">}</span></div><div class='line' id='LC418'>				<span class="k">if</span> <span class="p">(</span><span class="nx">currentDate</span> <span class="o">&amp;&amp;</span> <span class="nx">prevMonth</span><span class="p">.</span><span class="nx">valueOf</span><span class="p">()</span> <span class="o">==</span> <span class="nx">currentDate</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC419'>					<span class="nx">clsName</span> <span class="o">+=</span> <span class="s1">&#39; active&#39;</span><span class="p">;</span></div><div class='line' id='LC420'>				<span class="p">}</span></div><div class='line' id='LC421'>				<span class="k">if</span> <span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">valueOf</span><span class="p">()</span> <span class="o">&lt;</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">||</span> <span class="nx">prevMonth</span><span class="p">.</span><span class="nx">valueOf</span><span class="p">()</span> <span class="o">&gt;</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span> <span class="o">||</span></div><div class='line' id='LC422'>					<span class="nx">$</span><span class="p">.</span><span class="nx">inArray</span><span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCDay</span><span class="p">(),</span> <span class="k">this</span><span class="p">.</span><span class="nx">daysOfWeekDisabled</span><span class="p">)</span> <span class="o">!==</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC423'>					<span class="nx">clsName</span> <span class="o">+=</span> <span class="s1">&#39; disabled&#39;</span><span class="p">;</span></div><div class='line' id='LC424'>				<span class="p">}</span></div><div class='line' id='LC425'>				<span class="nx">html</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s1">&#39;&lt;td class=&quot;day&#39;</span><span class="o">+</span><span class="nx">clsName</span><span class="o">+</span><span class="s1">&#39;&quot;&gt;&#39;</span><span class="o">+</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">+</span> <span class="s1">&#39;&lt;/td&gt;&#39;</span><span class="p">);</span></div><div class='line' id='LC426'>				<span class="k">if</span> <span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCDay</span><span class="p">()</span> <span class="o">==</span> <span class="k">this</span><span class="p">.</span><span class="nx">weekEnd</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC427'>					<span class="nx">html</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="s1">&#39;&lt;/tr&gt;&#39;</span><span class="p">);</span></div><div class='line' id='LC428'>				<span class="p">}</span></div><div class='line' id='LC429'>				<span class="nx">prevMonth</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="nx">prevMonth</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span><span class="o">+</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC430'>			<span class="p">}</span></div><div class='line' id='LC431'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.datepicker-days tbody&#39;</span><span class="p">).</span><span class="nx">empty</span><span class="p">().</span><span class="nx">append</span><span class="p">(</span><span class="nx">html</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s1">&#39;&#39;</span><span class="p">));</span></div><div class='line' id='LC432'>			<span class="kd">var</span> <span class="nx">currentYear</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">date</span> <span class="o">&amp;&amp;</span> <span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">();</span></div><div class='line' id='LC433'><br/></div><div class='line' id='LC434'>			<span class="kd">var</span> <span class="nx">months</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.datepicker-months&#39;</span><span class="p">)</span></div><div class='line' id='LC435'>						<span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;th:eq(1)&#39;</span><span class="p">)</span></div><div class='line' id='LC436'>							<span class="p">.</span><span class="nx">text</span><span class="p">(</span><span class="nx">year</span><span class="p">)</span></div><div class='line' id='LC437'>							<span class="p">.</span><span class="nx">end</span><span class="p">()</span></div><div class='line' id='LC438'>						<span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;span&#39;</span><span class="p">).</span><span class="nx">removeClass</span><span class="p">(</span><span class="s1">&#39;active&#39;</span><span class="p">);</span></div><div class='line' id='LC439'>			<span class="k">if</span> <span class="p">(</span><span class="nx">currentYear</span> <span class="o">&amp;&amp;</span> <span class="nx">currentYear</span> <span class="o">==</span> <span class="nx">year</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC440'>				<span class="nx">months</span><span class="p">.</span><span class="nx">eq</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()).</span><span class="nx">addClass</span><span class="p">(</span><span class="s1">&#39;active&#39;</span><span class="p">);</span></div><div class='line' id='LC441'>			<span class="p">}</span></div><div class='line' id='LC442'>			<span class="k">if</span> <span class="p">(</span><span class="nx">year</span> <span class="o">&lt;</span> <span class="nx">startYear</span> <span class="o">||</span> <span class="nx">year</span> <span class="o">&gt;</span> <span class="nx">endYear</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC443'>				<span class="nx">months</span><span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="s1">&#39;disabled&#39;</span><span class="p">);</span></div><div class='line' id='LC444'>			<span class="p">}</span></div><div class='line' id='LC445'>			<span class="k">if</span> <span class="p">(</span><span class="nx">year</span> <span class="o">==</span> <span class="nx">startYear</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC446'>				<span class="nx">months</span><span class="p">.</span><span class="nx">slice</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nx">startMonth</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="s1">&#39;disabled&#39;</span><span class="p">);</span></div><div class='line' id='LC447'>			<span class="p">}</span></div><div class='line' id='LC448'>			<span class="k">if</span> <span class="p">(</span><span class="nx">year</span> <span class="o">==</span> <span class="nx">endYear</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC449'>				<span class="nx">months</span><span class="p">.</span><span class="nx">slice</span><span class="p">(</span><span class="nx">endMonth</span><span class="o">+</span><span class="mi">1</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="s1">&#39;disabled&#39;</span><span class="p">);</span></div><div class='line' id='LC450'>			<span class="p">}</span></div><div class='line' id='LC451'><br/></div><div class='line' id='LC452'>			<span class="nx">html</span> <span class="o">=</span> <span class="s1">&#39;&#39;</span><span class="p">;</span></div><div class='line' id='LC453'>			<span class="nx">year</span> <span class="o">=</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">year</span><span class="o">/</span><span class="mi">10</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span> <span class="o">*</span> <span class="mi">10</span><span class="p">;</span></div><div class='line' id='LC454'>			<span class="kd">var</span> <span class="nx">yearCont</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.datepicker-years&#39;</span><span class="p">)</span></div><div class='line' id='LC455'>								<span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;th:eq(1)&#39;</span><span class="p">)</span></div><div class='line' id='LC456'>									<span class="p">.</span><span class="nx">text</span><span class="p">(</span><span class="nx">year</span> <span class="o">+</span> <span class="s1">&#39;-&#39;</span> <span class="o">+</span> <span class="p">(</span><span class="nx">year</span> <span class="o">+</span> <span class="mi">9</span><span class="p">))</span></div><div class='line' id='LC457'>									<span class="p">.</span><span class="nx">end</span><span class="p">()</span></div><div class='line' id='LC458'>								<span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;td&#39;</span><span class="p">);</span></div><div class='line' id='LC459'>			<span class="nx">year</span> <span class="o">-=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC460'>			<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="mi">11</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC461'>				<span class="nx">html</span> <span class="o">+=</span> <span class="s1">&#39;&lt;span class=&quot;year&#39;</span><span class="o">+</span><span class="p">(</span><span class="nx">i</span> <span class="o">==</span> <span class="o">-</span><span class="mi">1</span> <span class="o">||</span> <span class="nx">i</span> <span class="o">==</span> <span class="mi">10</span> <span class="o">?</span> <span class="s1">&#39; old&#39;</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">)</span><span class="o">+</span><span class="p">(</span><span class="nx">currentYear</span> <span class="o">==</span> <span class="nx">year</span> <span class="o">?</span> <span class="s1">&#39; active&#39;</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">)</span><span class="o">+</span><span class="p">(</span><span class="nx">year</span> <span class="o">&lt;</span> <span class="nx">startYear</span> <span class="o">||</span> <span class="nx">year</span> <span class="o">&gt;</span> <span class="nx">endYear</span> <span class="o">?</span> <span class="s1">&#39; disabled&#39;</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">)</span><span class="o">+</span><span class="s1">&#39;&quot;&gt;&#39;</span><span class="o">+</span><span class="nx">year</span><span class="o">+</span><span class="s1">&#39;&lt;/span&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC462'>				<span class="nx">year</span> <span class="o">+=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC463'>			<span class="p">}</span></div><div class='line' id='LC464'>			<span class="nx">yearCont</span><span class="p">.</span><span class="nx">html</span><span class="p">(</span><span class="nx">html</span><span class="p">);</span></div><div class='line' id='LC465'>		<span class="p">},</span></div><div class='line' id='LC466'><br/></div><div class='line' id='LC467'>		<span class="nx">updateNavArrows</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC468'>			<span class="kd">var</span> <span class="nx">d</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">),</span></div><div class='line' id='LC469'>				<span class="nx">year</span> <span class="o">=</span> <span class="nx">d</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">(),</span></div><div class='line' id='LC470'>				<span class="nx">month</span> <span class="o">=</span> <span class="nx">d</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">();</span></div><div class='line' id='LC471'>			<span class="k">switch</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC472'>				<span class="k">case</span> <span class="mi">0</span><span class="o">:</span></div><div class='line' id='LC473'>					<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">!==</span> <span class="o">-</span><span class="kc">Infinity</span> <span class="o">&amp;&amp;</span> <span class="nx">year</span> <span class="o">&lt;=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span> <span class="o">&amp;&amp;</span> <span class="nx">month</span> <span class="o">&lt;=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC474'>						<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.prev&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="nx">visibility</span><span class="o">:</span> <span class="s1">&#39;hidden&#39;</span><span class="p">});</span></div><div class='line' id='LC475'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC476'>						<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.prev&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="nx">visibility</span><span class="o">:</span> <span class="s1">&#39;visible&#39;</span><span class="p">});</span></div><div class='line' id='LC477'>					<span class="p">}</span></div><div class='line' id='LC478'>					<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">endDate</span> <span class="o">!==</span> <span class="kc">Infinity</span> <span class="o">&amp;&amp;</span> <span class="nx">year</span> <span class="o">&gt;=</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span> <span class="o">&amp;&amp;</span> <span class="nx">month</span> <span class="o">&gt;=</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC479'>						<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.next&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="nx">visibility</span><span class="o">:</span> <span class="s1">&#39;hidden&#39;</span><span class="p">});</span></div><div class='line' id='LC480'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC481'>						<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.next&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="nx">visibility</span><span class="o">:</span> <span class="s1">&#39;visible&#39;</span><span class="p">});</span></div><div class='line' id='LC482'>					<span class="p">}</span></div><div class='line' id='LC483'>					<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC484'>				<span class="k">case</span> <span class="mi">1</span><span class="o">:</span></div><div class='line' id='LC485'>				<span class="k">case</span> <span class="mi">2</span><span class="o">:</span></div><div class='line' id='LC486'>					<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">!==</span> <span class="o">-</span><span class="kc">Infinity</span> <span class="o">&amp;&amp;</span> <span class="nx">year</span> <span class="o">&lt;=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC487'>						<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.prev&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="nx">visibility</span><span class="o">:</span> <span class="s1">&#39;hidden&#39;</span><span class="p">});</span></div><div class='line' id='LC488'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC489'>						<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.prev&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="nx">visibility</span><span class="o">:</span> <span class="s1">&#39;visible&#39;</span><span class="p">});</span></div><div class='line' id='LC490'>					<span class="p">}</span></div><div class='line' id='LC491'>					<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">endDate</span> <span class="o">!==</span> <span class="kc">Infinity</span> <span class="o">&amp;&amp;</span> <span class="nx">year</span> <span class="o">&gt;=</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC492'>						<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.next&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="nx">visibility</span><span class="o">:</span> <span class="s1">&#39;hidden&#39;</span><span class="p">});</span></div><div class='line' id='LC493'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC494'>						<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;.next&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="nx">visibility</span><span class="o">:</span> <span class="s1">&#39;visible&#39;</span><span class="p">});</span></div><div class='line' id='LC495'>					<span class="p">}</span></div><div class='line' id='LC496'>					<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC497'>			<span class="p">}</span></div><div class='line' id='LC498'>		<span class="p">},</span></div><div class='line' id='LC499'><br/></div><div class='line' id='LC500'>		<span class="nx">click</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC501'>			<span class="nx">e</span><span class="p">.</span><span class="nx">stopPropagation</span><span class="p">();</span></div><div class='line' id='LC502'>			<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC503'>			<span class="kd">var</span> <span class="nx">target</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">target</span><span class="p">).</span><span class="nx">closest</span><span class="p">(</span><span class="s1">&#39;span, td, th&#39;</span><span class="p">);</span></div><div class='line' id='LC504'>			<span class="k">if</span> <span class="p">(</span><span class="nx">target</span><span class="p">.</span><span class="nx">length</span> <span class="o">==</span> <span class="mi">1</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC505'>				<span class="k">switch</span><span class="p">(</span><span class="nx">target</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">nodeName</span><span class="p">.</span><span class="nx">toLowerCase</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC506'>					<span class="k">case</span> <span class="s1">&#39;th&#39;</span><span class="o">:</span></div><div class='line' id='LC507'>						<span class="k">switch</span><span class="p">(</span><span class="nx">target</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">className</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC508'>							<span class="k">case</span> <span class="s1">&#39;switch&#39;</span><span class="o">:</span></div><div class='line' id='LC509'>								<span class="k">this</span><span class="p">.</span><span class="nx">showMode</span><span class="p">(</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC510'>								<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC511'>							<span class="k">case</span> <span class="s1">&#39;prev&#39;</span><span class="o">:</span></div><div class='line' id='LC512'>							<span class="k">case</span> <span class="s1">&#39;next&#39;</span><span class="o">:</span></div><div class='line' id='LC513'>								<span class="kd">var</span> <span class="nx">dir</span> <span class="o">=</span> <span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">modes</span><span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span><span class="p">].</span><span class="nx">navStep</span> <span class="o">*</span> <span class="p">(</span><span class="nx">target</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">className</span> <span class="o">==</span> <span class="s1">&#39;prev&#39;</span> <span class="o">?</span> <span class="o">-</span><span class="mi">1</span> <span class="o">:</span> <span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC514'>								<span class="k">switch</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span><span class="p">){</span></div><div class='line' id='LC515'>									<span class="k">case</span> <span class="mi">0</span><span class="o">:</span></div><div class='line' id='LC516'>										<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveMonth</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC517'>										<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC518'>									<span class="k">case</span> <span class="mi">1</span><span class="o">:</span></div><div class='line' id='LC519'>									<span class="k">case</span> <span class="mi">2</span><span class="o">:</span></div><div class='line' id='LC520'>										<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveYear</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC521'>										<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC522'>								<span class="p">}</span></div><div class='line' id='LC523'>								<span class="k">this</span><span class="p">.</span><span class="nx">fill</span><span class="p">();</span></div><div class='line' id='LC524'>								<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC525'>							<span class="k">case</span> <span class="s1">&#39;today&#39;</span><span class="o">:</span></div><div class='line' id='LC526'>								<span class="kd">var</span> <span class="nx">date</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">();</span></div><div class='line' id='LC527'>								<span class="nx">date</span> <span class="o">=</span> <span class="nx">UTCDate</span><span class="p">(</span><span class="nx">date</span><span class="p">.</span><span class="nx">getFullYear</span><span class="p">(),</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getMonth</span><span class="p">(),</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getDate</span><span class="p">(),</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">);</span></div><div class='line' id='LC528'><br/></div><div class='line' id='LC529'>								<span class="k">this</span><span class="p">.</span><span class="nx">showMode</span><span class="p">(</span><span class="o">-</span><span class="mi">2</span><span class="p">);</span></div><div class='line' id='LC530'>								<span class="kd">var</span> <span class="nx">which</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">todayBtn</span> <span class="o">==</span> <span class="s1">&#39;linked&#39;</span> <span class="o">?</span> <span class="kc">null</span> <span class="o">:</span> <span class="s1">&#39;view&#39;</span><span class="p">;</span></div><div class='line' id='LC531'>								<span class="k">this</span><span class="p">.</span><span class="nx">_setDate</span><span class="p">(</span><span class="nx">date</span><span class="p">,</span> <span class="nx">which</span><span class="p">);</span></div><div class='line' id='LC532'>								<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC533'>						<span class="p">}</span></div><div class='line' id='LC534'>						<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC535'>					<span class="k">case</span> <span class="s1">&#39;span&#39;</span><span class="o">:</span></div><div class='line' id='LC536'>						<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">target</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;.disabled&#39;</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC537'>							<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC538'>							<span class="k">if</span> <span class="p">(</span><span class="nx">target</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;.month&#39;</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC539'>								<span class="kd">var</span> <span class="nx">month</span> <span class="o">=</span> <span class="nx">target</span><span class="p">.</span><span class="nx">parent</span><span class="p">().</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;span&#39;</span><span class="p">).</span><span class="nx">index</span><span class="p">(</span><span class="nx">target</span><span class="p">);</span></div><div class='line' id='LC540'>								<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">.</span><span class="nx">setUTCMonth</span><span class="p">(</span><span class="nx">month</span><span class="p">);</span></div><div class='line' id='LC541'>								<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">trigger</span><span class="p">({</span></div><div class='line' id='LC542'>									<span class="nx">type</span><span class="o">:</span> <span class="s1">&#39;changeMonth&#39;</span><span class="p">,</span></div><div class='line' id='LC543'>									<span class="nx">date</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span></div><div class='line' id='LC544'>								<span class="p">});</span></div><div class='line' id='LC545'>							<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC546'>								<span class="kd">var</span> <span class="nx">year</span> <span class="o">=</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">target</span><span class="p">.</span><span class="nx">text</span><span class="p">(),</span> <span class="mi">10</span><span class="p">)</span><span class="o">||</span><span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC547'>								<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">.</span><span class="nx">setUTCFullYear</span><span class="p">(</span><span class="nx">year</span><span class="p">);</span></div><div class='line' id='LC548'>								<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">trigger</span><span class="p">({</span></div><div class='line' id='LC549'>									<span class="nx">type</span><span class="o">:</span> <span class="s1">&#39;changeYear&#39;</span><span class="p">,</span></div><div class='line' id='LC550'>									<span class="nx">date</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span></div><div class='line' id='LC551'>								<span class="p">});</span></div><div class='line' id='LC552'>							<span class="p">}</span></div><div class='line' id='LC553'>							<span class="k">this</span><span class="p">.</span><span class="nx">showMode</span><span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC554'>							<span class="k">this</span><span class="p">.</span><span class="nx">fill</span><span class="p">();</span></div><div class='line' id='LC555'>						<span class="p">}</span></div><div class='line' id='LC556'>						<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC557'>					<span class="k">case</span> <span class="s1">&#39;td&#39;</span><span class="o">:</span></div><div class='line' id='LC558'>						<span class="k">if</span> <span class="p">(</span><span class="nx">target</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;.day&#39;</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">target</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;.disabled&#39;</span><span class="p">)){</span></div><div class='line' id='LC559'>							<span class="kd">var</span> <span class="nx">day</span> <span class="o">=</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">target</span><span class="p">.</span><span class="nx">text</span><span class="p">(),</span> <span class="mi">10</span><span class="p">)</span><span class="o">||</span><span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC560'>							<span class="kd">var</span> <span class="nx">year</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">(),</span></div><div class='line' id='LC561'>								<span class="nx">month</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">();</span></div><div class='line' id='LC562'>							<span class="k">if</span> <span class="p">(</span><span class="nx">target</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;.old&#39;</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC563'>								<span class="k">if</span> <span class="p">(</span><span class="nx">month</span> <span class="o">===</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC564'>									<span class="nx">month</span> <span class="o">=</span> <span class="mi">11</span><span class="p">;</span></div><div class='line' id='LC565'>									<span class="nx">year</span> <span class="o">-=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC566'>								<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC567'>									<span class="nx">month</span> <span class="o">-=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC568'>								<span class="p">}</span></div><div class='line' id='LC569'>							<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">target</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;.new&#39;</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC570'>								<span class="k">if</span> <span class="p">(</span><span class="nx">month</span> <span class="o">==</span> <span class="mi">11</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC571'>									<span class="nx">month</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC572'>									<span class="nx">year</span> <span class="o">+=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC573'>								<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC574'>									<span class="nx">month</span> <span class="o">+=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC575'>								<span class="p">}</span></div><div class='line' id='LC576'>							<span class="p">}</span></div><div class='line' id='LC577'>							<span class="k">this</span><span class="p">.</span><span class="nx">_setDate</span><span class="p">(</span><span class="nx">UTCDate</span><span class="p">(</span><span class="nx">year</span><span class="p">,</span> <span class="nx">month</span><span class="p">,</span> <span class="nx">day</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">));</span></div><div class='line' id='LC578'>						<span class="p">}</span></div><div class='line' id='LC579'>						<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC580'>				<span class="p">}</span></div><div class='line' id='LC581'>			<span class="p">}</span></div><div class='line' id='LC582'>		<span class="p">},</span></div><div class='line' id='LC583'><br/></div><div class='line' id='LC584'>		<span class="nx">_setDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">date</span><span class="p">,</span> <span class="nx">which</span><span class="p">){</span></div><div class='line' id='LC585'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">which</span> <span class="o">||</span> <span class="nx">which</span> <span class="o">==</span> <span class="s1">&#39;date&#39;</span><span class="p">)</span></div><div class='line' id='LC586'>				<span class="k">this</span><span class="p">.</span><span class="nx">date</span> <span class="o">=</span> <span class="nx">date</span><span class="p">;</span></div><div class='line' id='LC587'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">which</span> <span class="o">||</span> <span class="nx">which</span>  <span class="o">==</span> <span class="s1">&#39;view&#39;</span><span class="p">)</span></div><div class='line' id='LC588'>				<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span> <span class="o">=</span> <span class="nx">date</span><span class="p">;</span></div><div class='line' id='LC589'>			<span class="k">this</span><span class="p">.</span><span class="nx">fill</span><span class="p">();</span></div><div class='line' id='LC590'>			<span class="k">this</span><span class="p">.</span><span class="nx">setValue</span><span class="p">();</span></div><div class='line' id='LC591'>			<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">trigger</span><span class="p">({</span></div><div class='line' id='LC592'>				<span class="nx">type</span><span class="o">:</span> <span class="s1">&#39;changeDate&#39;</span><span class="p">,</span></div><div class='line' id='LC593'>				<span class="nx">date</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">date</span></div><div class='line' id='LC594'>			<span class="p">});</span></div><div class='line' id='LC595'>			<span class="kd">var</span> <span class="nx">element</span><span class="p">;</span></div><div class='line' id='LC596'>			<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isInput</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC597'>				<span class="nx">element</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">;</span></div><div class='line' id='LC598'>			<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">component</span><span class="p">){</span></div><div class='line' id='LC599'>				<span class="nx">element</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;input&#39;</span><span class="p">);</span></div><div class='line' id='LC600'>			<span class="p">}</span></div><div class='line' id='LC601'>			<span class="k">if</span> <span class="p">(</span><span class="nx">element</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC602'>				<span class="nx">element</span><span class="p">.</span><span class="nx">change</span><span class="p">();</span></div><div class='line' id='LC603'>				<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">autoclose</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="o">!</span><span class="nx">which</span> <span class="o">||</span> <span class="nx">which</span> <span class="o">==</span> <span class="s1">&#39;date&#39;</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC604'>					<span class="k">this</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC605'>				<span class="p">}</span></div><div class='line' id='LC606'>			<span class="p">}</span></div><div class='line' id='LC607'>		<span class="p">},</span></div><div class='line' id='LC608'><br/></div><div class='line' id='LC609'>		<span class="nx">moveMonth</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">date</span><span class="p">,</span> <span class="nx">dir</span><span class="p">){</span></div><div class='line' id='LC610'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">dir</span><span class="p">)</span> <span class="k">return</span> <span class="nx">date</span><span class="p">;</span></div><div class='line' id='LC611'>			<span class="kd">var</span> <span class="nx">new_date</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="nx">date</span><span class="p">.</span><span class="nx">valueOf</span><span class="p">()),</span></div><div class='line' id='LC612'>				<span class="nx">day</span> <span class="o">=</span> <span class="nx">new_date</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">(),</span></div><div class='line' id='LC613'>				<span class="nx">month</span> <span class="o">=</span> <span class="nx">new_date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">(),</span></div><div class='line' id='LC614'>				<span class="nx">mag</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">abs</span><span class="p">(</span><span class="nx">dir</span><span class="p">),</span></div><div class='line' id='LC615'>				<span class="nx">new_month</span><span class="p">,</span> <span class="nx">test</span><span class="p">;</span></div><div class='line' id='LC616'>			<span class="nx">dir</span> <span class="o">=</span> <span class="nx">dir</span> <span class="o">&gt;</span> <span class="mi">0</span> <span class="o">?</span> <span class="mi">1</span> <span class="o">:</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC617'>			<span class="k">if</span> <span class="p">(</span><span class="nx">mag</span> <span class="o">==</span> <span class="mi">1</span><span class="p">){</span></div><div class='line' id='LC618'>				<span class="nx">test</span> <span class="o">=</span> <span class="nx">dir</span> <span class="o">==</span> <span class="o">-</span><span class="mi">1</span></div><div class='line' id='LC619'>					<span class="c1">// If going back one month, make sure month is not current month</span></div><div class='line' id='LC620'>					<span class="c1">// (eg, Mar 31 -&gt; Feb 31 == Feb 28, not Mar 02)</span></div><div class='line' id='LC621'>					<span class="o">?</span> <span class="kd">function</span><span class="p">(){</span> <span class="k">return</span> <span class="nx">new_date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()</span> <span class="o">==</span> <span class="nx">month</span><span class="p">;</span> <span class="p">}</span></div><div class='line' id='LC622'>					<span class="c1">// If going forward one month, make sure month is as expected</span></div><div class='line' id='LC623'>					<span class="c1">// (eg, Jan 31 -&gt; Feb 31 == Feb 28, not Mar 02)</span></div><div class='line' id='LC624'>					<span class="o">:</span> <span class="kd">function</span><span class="p">(){</span> <span class="k">return</span> <span class="nx">new_date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()</span> <span class="o">!=</span> <span class="nx">new_month</span><span class="p">;</span> <span class="p">};</span></div><div class='line' id='LC625'>				<span class="nx">new_month</span> <span class="o">=</span> <span class="nx">month</span> <span class="o">+</span> <span class="nx">dir</span><span class="p">;</span></div><div class='line' id='LC626'>				<span class="nx">new_date</span><span class="p">.</span><span class="nx">setUTCMonth</span><span class="p">(</span><span class="nx">new_month</span><span class="p">);</span></div><div class='line' id='LC627'>				<span class="c1">// Dec -&gt; Jan (12) or Jan -&gt; Dec (-1) -- limit expected date to 0-11</span></div><div class='line' id='LC628'>				<span class="k">if</span> <span class="p">(</span><span class="nx">new_month</span> <span class="o">&lt;</span> <span class="mi">0</span> <span class="o">||</span> <span class="nx">new_month</span> <span class="o">&gt;</span> <span class="mi">11</span><span class="p">)</span></div><div class='line' id='LC629'>					<span class="nx">new_month</span> <span class="o">=</span> <span class="p">(</span><span class="nx">new_month</span> <span class="o">+</span> <span class="mi">12</span><span class="p">)</span> <span class="o">%</span> <span class="mi">12</span><span class="p">;</span></div><div class='line' id='LC630'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC631'>				<span class="c1">// For magnitudes &gt;1, move one month at a time...</span></div><div class='line' id='LC632'>				<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span><span class="o">=</span><span class="mi">0</span><span class="p">;</span> <span class="nx">i</span><span class="o">&lt;</span><span class="nx">mag</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span></div><div class='line' id='LC633'>					<span class="c1">// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...</span></div><div class='line' id='LC634'>					<span class="nx">new_date</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveMonth</span><span class="p">(</span><span class="nx">new_date</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC635'>				<span class="c1">// ...then reset the day, keeping it in the new month</span></div><div class='line' id='LC636'>				<span class="nx">new_month</span> <span class="o">=</span> <span class="nx">new_date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">();</span></div><div class='line' id='LC637'>				<span class="nx">new_date</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="nx">day</span><span class="p">);</span></div><div class='line' id='LC638'>				<span class="nx">test</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(){</span> <span class="k">return</span> <span class="nx">new_month</span> <span class="o">!=</span> <span class="nx">new_date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">();</span> <span class="p">};</span></div><div class='line' id='LC639'>			<span class="p">}</span></div><div class='line' id='LC640'>			<span class="c1">// Common date-resetting loop -- if date is beyond end of month, make it</span></div><div class='line' id='LC641'>			<span class="c1">// end of month</span></div><div class='line' id='LC642'>			<span class="k">while</span> <span class="p">(</span><span class="nx">test</span><span class="p">()){</span></div><div class='line' id='LC643'>				<span class="nx">new_date</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="o">--</span><span class="nx">day</span><span class="p">);</span></div><div class='line' id='LC644'>				<span class="nx">new_date</span><span class="p">.</span><span class="nx">setUTCMonth</span><span class="p">(</span><span class="nx">new_month</span><span class="p">);</span></div><div class='line' id='LC645'>			<span class="p">}</span></div><div class='line' id='LC646'>			<span class="k">return</span> <span class="nx">new_date</span><span class="p">;</span></div><div class='line' id='LC647'>		<span class="p">},</span></div><div class='line' id='LC648'><br/></div><div class='line' id='LC649'>		<span class="nx">moveYear</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">date</span><span class="p">,</span> <span class="nx">dir</span><span class="p">){</span></div><div class='line' id='LC650'>			<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveMonth</span><span class="p">(</span><span class="nx">date</span><span class="p">,</span> <span class="nx">dir</span><span class="o">*</span><span class="mi">12</span><span class="p">);</span></div><div class='line' id='LC651'>		<span class="p">},</span></div><div class='line' id='LC652'><br/></div><div class='line' id='LC653'>		<span class="nx">dateWithinRange</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">date</span><span class="p">){</span></div><div class='line' id='LC654'>			<span class="k">return</span> <span class="nx">date</span> <span class="o">&gt;=</span> <span class="k">this</span><span class="p">.</span><span class="nx">startDate</span> <span class="o">&amp;&amp;</span> <span class="nx">date</span> <span class="o">&lt;=</span> <span class="k">this</span><span class="p">.</span><span class="nx">endDate</span><span class="p">;</span></div><div class='line' id='LC655'>		<span class="p">},</span></div><div class='line' id='LC656'><br/></div><div class='line' id='LC657'>		<span class="nx">keydown</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">){</span></div><div class='line' id='LC658'>			<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">is</span><span class="p">(</span><span class="s1">&#39;:not(:visible)&#39;</span><span class="p">)){</span></div><div class='line' id='LC659'>				<span class="k">if</span> <span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">keyCode</span> <span class="o">==</span> <span class="mi">27</span><span class="p">)</span> <span class="c1">// allow escape to hide and re-show picker</span></div><div class='line' id='LC660'>					<span class="k">this</span><span class="p">.</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC661'>				<span class="k">return</span><span class="p">;</span></div><div class='line' id='LC662'>			<span class="p">}</span></div><div class='line' id='LC663'>			<span class="kd">var</span> <span class="nx">dateChanged</span> <span class="o">=</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC664'>				<span class="nx">dir</span><span class="p">,</span> <span class="nx">day</span><span class="p">,</span> <span class="nx">month</span><span class="p">,</span></div><div class='line' id='LC665'>				<span class="nx">newDate</span><span class="p">,</span> <span class="nx">newViewDate</span><span class="p">;</span></div><div class='line' id='LC666'>			<span class="k">switch</span><span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">keyCode</span><span class="p">){</span></div><div class='line' id='LC667'>				<span class="k">case</span> <span class="mi">27</span><span class="o">:</span> <span class="c1">// escape</span></div><div class='line' id='LC668'>					<span class="k">this</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC669'>					<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC670'>					<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC671'>				<span class="k">case</span> <span class="mi">37</span><span class="o">:</span> <span class="c1">// left</span></div><div class='line' id='LC672'>				<span class="k">case</span> <span class="mi">39</span><span class="o">:</span> <span class="c1">// right</span></div><div class='line' id='LC673'>					<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="k">this</span><span class="p">.</span><span class="nx">keyboardNavigation</span><span class="p">)</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC674'>					<span class="nx">dir</span> <span class="o">=</span> <span class="nx">e</span><span class="p">.</span><span class="nx">keyCode</span> <span class="o">==</span> <span class="mi">37</span> <span class="o">?</span> <span class="o">-</span><span class="mi">1</span> <span class="o">:</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC675'>					<span class="k">if</span> <span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">ctrlKey</span><span class="p">){</span></div><div class='line' id='LC676'>						<span class="nx">newDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveYear</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC677'>						<span class="nx">newViewDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveYear</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC678'>					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">shiftKey</span><span class="p">){</span></div><div class='line' id='LC679'>						<span class="nx">newDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveMonth</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC680'>						<span class="nx">newViewDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveMonth</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC681'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC682'>						<span class="nx">newDate</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">);</span></div><div class='line' id='LC683'>						<span class="nx">newDate</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">+</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC684'>						<span class="nx">newViewDate</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">);</span></div><div class='line' id='LC685'>						<span class="nx">newViewDate</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">+</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC686'>					<span class="p">}</span></div><div class='line' id='LC687'>					<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">dateWithinRange</span><span class="p">(</span><span class="nx">newDate</span><span class="p">)){</span></div><div class='line' id='LC688'>						<span class="k">this</span><span class="p">.</span><span class="nx">date</span> <span class="o">=</span> <span class="nx">newDate</span><span class="p">;</span></div><div class='line' id='LC689'>						<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span> <span class="o">=</span> <span class="nx">newViewDate</span><span class="p">;</span></div><div class='line' id='LC690'>						<span class="k">this</span><span class="p">.</span><span class="nx">setValue</span><span class="p">();</span></div><div class='line' id='LC691'>						<span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">();</span></div><div class='line' id='LC692'>						<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC693'>						<span class="nx">dateChanged</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC694'>					<span class="p">}</span></div><div class='line' id='LC695'>					<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC696'>				<span class="k">case</span> <span class="mi">38</span><span class="o">:</span> <span class="c1">// up</span></div><div class='line' id='LC697'>				<span class="k">case</span> <span class="mi">40</span><span class="o">:</span> <span class="c1">// down</span></div><div class='line' id='LC698'>					<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="k">this</span><span class="p">.</span><span class="nx">keyboardNavigation</span><span class="p">)</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC699'>					<span class="nx">dir</span> <span class="o">=</span> <span class="nx">e</span><span class="p">.</span><span class="nx">keyCode</span> <span class="o">==</span> <span class="mi">38</span> <span class="o">?</span> <span class="o">-</span><span class="mi">1</span> <span class="o">:</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC700'>					<span class="k">if</span> <span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">ctrlKey</span><span class="p">){</span></div><div class='line' id='LC701'>						<span class="nx">newDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveYear</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC702'>						<span class="nx">newViewDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveYear</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC703'>					<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">shiftKey</span><span class="p">){</span></div><div class='line' id='LC704'>						<span class="nx">newDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveMonth</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC705'>						<span class="nx">newViewDate</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">moveMonth</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC706'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC707'>						<span class="nx">newDate</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">);</span></div><div class='line' id='LC708'>						<span class="nx">newDate</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">+</span> <span class="nx">dir</span> <span class="o">*</span> <span class="mi">7</span><span class="p">);</span></div><div class='line' id='LC709'>						<span class="nx">newViewDate</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">);</span></div><div class='line' id='LC710'>						<span class="nx">newViewDate</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">+</span> <span class="nx">dir</span> <span class="o">*</span> <span class="mi">7</span><span class="p">);</span></div><div class='line' id='LC711'>					<span class="p">}</span></div><div class='line' id='LC712'>					<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">dateWithinRange</span><span class="p">(</span><span class="nx">newDate</span><span class="p">)){</span></div><div class='line' id='LC713'>						<span class="k">this</span><span class="p">.</span><span class="nx">date</span> <span class="o">=</span> <span class="nx">newDate</span><span class="p">;</span></div><div class='line' id='LC714'>						<span class="k">this</span><span class="p">.</span><span class="nx">viewDate</span> <span class="o">=</span> <span class="nx">newViewDate</span><span class="p">;</span></div><div class='line' id='LC715'>						<span class="k">this</span><span class="p">.</span><span class="nx">setValue</span><span class="p">();</span></div><div class='line' id='LC716'>						<span class="k">this</span><span class="p">.</span><span class="nx">update</span><span class="p">();</span></div><div class='line' id='LC717'>						<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC718'>						<span class="nx">dateChanged</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC719'>					<span class="p">}</span></div><div class='line' id='LC720'>					<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC721'>				<span class="k">case</span> <span class="mi">13</span><span class="o">:</span> <span class="c1">// enter</span></div><div class='line' id='LC722'>					<span class="k">this</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC723'>					<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC724'>					<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC725'>				<span class="k">case</span> <span class="mi">9</span><span class="o">:</span> <span class="c1">// tab</span></div><div class='line' id='LC726'>					<span class="k">this</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC727'>					<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC728'>			<span class="p">}</span></div><div class='line' id='LC729'>			<span class="k">if</span> <span class="p">(</span><span class="nx">dateChanged</span><span class="p">){</span></div><div class='line' id='LC730'>				<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">trigger</span><span class="p">({</span></div><div class='line' id='LC731'>					<span class="nx">type</span><span class="o">:</span> <span class="s1">&#39;changeDate&#39;</span><span class="p">,</span></div><div class='line' id='LC732'>					<span class="nx">date</span><span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">date</span></div><div class='line' id='LC733'>				<span class="p">});</span></div><div class='line' id='LC734'>				<span class="kd">var</span> <span class="nx">element</span><span class="p">;</span></div><div class='line' id='LC735'>				<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">isInput</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC736'>					<span class="nx">element</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">;</span></div><div class='line' id='LC737'>				<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">component</span><span class="p">){</span></div><div class='line' id='LC738'>					<span class="nx">element</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;input&#39;</span><span class="p">);</span></div><div class='line' id='LC739'>				<span class="p">}</span></div><div class='line' id='LC740'>				<span class="k">if</span> <span class="p">(</span><span class="nx">element</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC741'>					<span class="nx">element</span><span class="p">.</span><span class="nx">change</span><span class="p">();</span></div><div class='line' id='LC742'>				<span class="p">}</span></div><div class='line' id='LC743'>			<span class="p">}</span></div><div class='line' id='LC744'>		<span class="p">},</span></div><div class='line' id='LC745'><br/></div><div class='line' id='LC746'>		<span class="nx">showMode</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">dir</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC747'>			<span class="k">if</span> <span class="p">(</span><span class="nx">dir</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC748'>				<span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">min</span><span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span> <span class="o">+</span> <span class="nx">dir</span><span class="p">));</span></div><div class='line' id='LC749'>			<span class="p">}</span></div><div class='line' id='LC750'>			<span class="cm">/*</span></div><div class='line' id='LC751'><span class="cm">				vitalets: fixing bug of very special conditions:</span></div><div class='line' id='LC752'><span class="cm">				jquery 1.7.1 + webkit + show inline datepicker in bootstrap popover.</span></div><div class='line' id='LC753'><span class="cm">				Method show() does not set display css correctly and datepicker is not shown.</span></div><div class='line' id='LC754'><span class="cm">				Changed to .css(&#39;display&#39;, &#39;block&#39;) solve the problem.</span></div><div class='line' id='LC755'><span class="cm">				See https://github.com/vitalets/x-editable/issues/37</span></div><div class='line' id='LC756'><br/></div><div class='line' id='LC757'><span class="cm">				In jquery 1.7.2+ everything works fine.</span></div><div class='line' id='LC758'><span class="cm">			*/</span></div><div class='line' id='LC759'>			<span class="c1">//this.picker.find(&#39;&gt;div&#39;).hide().filter(&#39;.datepicker-&#39;+DPGlobal.modes[this.viewMode].clsName).show();</span></div><div class='line' id='LC760'>			<span class="k">this</span><span class="p">.</span><span class="nx">picker</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;&gt;div&#39;</span><span class="p">).</span><span class="nx">hide</span><span class="p">().</span><span class="nx">filter</span><span class="p">(</span><span class="s1">&#39;.datepicker-&#39;</span><span class="o">+</span><span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">modes</span><span class="p">[</span><span class="k">this</span><span class="p">.</span><span class="nx">viewMode</span><span class="p">].</span><span class="nx">clsName</span><span class="p">).</span><span class="nx">css</span><span class="p">(</span><span class="s1">&#39;display&#39;</span><span class="p">,</span> <span class="s1">&#39;block&#39;</span><span class="p">);</span></div><div class='line' id='LC761'>			<span class="k">this</span><span class="p">.</span><span class="nx">updateNavArrows</span><span class="p">();</span></div><div class='line' id='LC762'>		<span class="p">}</span></div><div class='line' id='LC763'>	<span class="p">};</span></div><div class='line' id='LC764'><br/></div><div class='line' id='LC765'>	<span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">datepicker</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">(</span> <span class="nx">option</span> <span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC766'>		<span class="kd">var</span> <span class="nx">args</span> <span class="o">=</span> <span class="nb">Array</span><span class="p">.</span><span class="nx">apply</span><span class="p">(</span><span class="kc">null</span><span class="p">,</span> <span class="nx">arguments</span><span class="p">);</span></div><div class='line' id='LC767'>		<span class="nx">args</span><span class="p">.</span><span class="nx">shift</span><span class="p">();</span></div><div class='line' id='LC768'>		<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC769'>			<span class="kd">var</span> <span class="nx">$this</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">),</span></div><div class='line' id='LC770'>				<span class="nx">data</span> <span class="o">=</span> <span class="nx">$this</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;datepicker&#39;</span><span class="p">),</span></div><div class='line' id='LC771'>				<span class="nx">options</span> <span class="o">=</span> <span class="k">typeof</span> <span class="nx">option</span> <span class="o">==</span> <span class="s1">&#39;object&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">option</span><span class="p">;</span></div><div class='line' id='LC772'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">data</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC773'>				<span class="nx">$this</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="s1">&#39;datepicker&#39;</span><span class="p">,</span> <span class="p">(</span><span class="nx">data</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Datepicker</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">({},</span> <span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">datepicker</span><span class="p">.</span><span class="nx">defaults</span><span class="p">,</span><span class="nx">options</span><span class="p">))));</span></div><div class='line' id='LC774'>			<span class="p">}</span></div><div class='line' id='LC775'>			<span class="k">if</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">option</span> <span class="o">==</span> <span class="s1">&#39;string&#39;</span> <span class="o">&amp;&amp;</span> <span class="k">typeof</span> <span class="nx">data</span><span class="p">[</span><span class="nx">option</span><span class="p">]</span> <span class="o">==</span> <span class="s1">&#39;function&#39;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC776'>				<span class="nx">data</span><span class="p">[</span><span class="nx">option</span><span class="p">].</span><span class="nx">apply</span><span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">args</span><span class="p">);</span></div><div class='line' id='LC777'>			<span class="p">}</span></div><div class='line' id='LC778'>		<span class="p">});</span></div><div class='line' id='LC779'>	<span class="p">};</span></div><div class='line' id='LC780'><br/></div><div class='line' id='LC781'>	<span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">datepicker</span><span class="p">.</span><span class="nx">defaults</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC782'>	<span class="p">};</span></div><div class='line' id='LC783'>	<span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">datepicker</span><span class="p">.</span><span class="nx">Constructor</span> <span class="o">=</span> <span class="nx">Datepicker</span><span class="p">;</span></div><div class='line' id='LC784'>	<span class="kd">var</span> <span class="nx">dates</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">datepicker</span><span class="p">.</span><span class="nx">dates</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC785'>		<span class="nx">en</span><span class="o">:</span> <span class="p">{</span></div><div class='line' id='LC786'>			<span class="nx">days</span><span class="o">:</span> <span class="p">[</span><span class="s2">&quot;Sunday&quot;</span><span class="p">,</span> <span class="s2">&quot;Monday&quot;</span><span class="p">,</span> <span class="s2">&quot;Tuesday&quot;</span><span class="p">,</span> <span class="s2">&quot;Wednesday&quot;</span><span class="p">,</span> <span class="s2">&quot;Thursday&quot;</span><span class="p">,</span> <span class="s2">&quot;Friday&quot;</span><span class="p">,</span> <span class="s2">&quot;Saturday&quot;</span><span class="p">,</span> <span class="s2">&quot;Sunday&quot;</span><span class="p">],</span></div><div class='line' id='LC787'>			<span class="nx">daysShort</span><span class="o">:</span> <span class="p">[</span><span class="s2">&quot;Sun&quot;</span><span class="p">,</span> <span class="s2">&quot;Mon&quot;</span><span class="p">,</span> <span class="s2">&quot;Tue&quot;</span><span class="p">,</span> <span class="s2">&quot;Wed&quot;</span><span class="p">,</span> <span class="s2">&quot;Thu&quot;</span><span class="p">,</span> <span class="s2">&quot;Fri&quot;</span><span class="p">,</span> <span class="s2">&quot;Sat&quot;</span><span class="p">,</span> <span class="s2">&quot;Sun&quot;</span><span class="p">],</span></div><div class='line' id='LC788'>			<span class="nx">daysMin</span><span class="o">:</span> <span class="p">[</span><span class="s2">&quot;Su&quot;</span><span class="p">,</span> <span class="s2">&quot;Mo&quot;</span><span class="p">,</span> <span class="s2">&quot;Tu&quot;</span><span class="p">,</span> <span class="s2">&quot;We&quot;</span><span class="p">,</span> <span class="s2">&quot;Th&quot;</span><span class="p">,</span> <span class="s2">&quot;Fr&quot;</span><span class="p">,</span> <span class="s2">&quot;Sa&quot;</span><span class="p">,</span> <span class="s2">&quot;Su&quot;</span><span class="p">],</span></div><div class='line' id='LC789'>			<span class="nx">months</span><span class="o">:</span> <span class="p">[</span><span class="s2">&quot;January&quot;</span><span class="p">,</span> <span class="s2">&quot;February&quot;</span><span class="p">,</span> <span class="s2">&quot;March&quot;</span><span class="p">,</span> <span class="s2">&quot;April&quot;</span><span class="p">,</span> <span class="s2">&quot;May&quot;</span><span class="p">,</span> <span class="s2">&quot;June&quot;</span><span class="p">,</span> <span class="s2">&quot;July&quot;</span><span class="p">,</span> <span class="s2">&quot;August&quot;</span><span class="p">,</span> <span class="s2">&quot;September&quot;</span><span class="p">,</span> <span class="s2">&quot;October&quot;</span><span class="p">,</span> <span class="s2">&quot;November&quot;</span><span class="p">,</span> <span class="s2">&quot;December&quot;</span><span class="p">],</span></div><div class='line' id='LC790'>			<span class="nx">monthsShort</span><span class="o">:</span> <span class="p">[</span><span class="s2">&quot;Jan&quot;</span><span class="p">,</span> <span class="s2">&quot;Feb&quot;</span><span class="p">,</span> <span class="s2">&quot;Mar&quot;</span><span class="p">,</span> <span class="s2">&quot;Apr&quot;</span><span class="p">,</span> <span class="s2">&quot;May&quot;</span><span class="p">,</span> <span class="s2">&quot;Jun&quot;</span><span class="p">,</span> <span class="s2">&quot;Jul&quot;</span><span class="p">,</span> <span class="s2">&quot;Aug&quot;</span><span class="p">,</span> <span class="s2">&quot;Sep&quot;</span><span class="p">,</span> <span class="s2">&quot;Oct&quot;</span><span class="p">,</span> <span class="s2">&quot;Nov&quot;</span><span class="p">,</span> <span class="s2">&quot;Dec&quot;</span><span class="p">],</span></div><div class='line' id='LC791'>			<span class="nx">today</span><span class="o">:</span> <span class="s2">&quot;Today&quot;</span></div><div class='line' id='LC792'>		<span class="p">}</span></div><div class='line' id='LC793'>	<span class="p">};</span></div><div class='line' id='LC794'><br/></div><div class='line' id='LC795'>	<span class="kd">var</span> <span class="nx">DPGlobal</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC796'>		<span class="nx">modes</span><span class="o">:</span> <span class="p">[</span></div><div class='line' id='LC797'>			<span class="p">{</span></div><div class='line' id='LC798'>				<span class="nx">clsName</span><span class="o">:</span> <span class="s1">&#39;days&#39;</span><span class="p">,</span></div><div class='line' id='LC799'>				<span class="nx">navFnc</span><span class="o">:</span> <span class="s1">&#39;Month&#39;</span><span class="p">,</span></div><div class='line' id='LC800'>				<span class="nx">navStep</span><span class="o">:</span> <span class="mi">1</span></div><div class='line' id='LC801'>			<span class="p">},</span></div><div class='line' id='LC802'>			<span class="p">{</span></div><div class='line' id='LC803'>				<span class="nx">clsName</span><span class="o">:</span> <span class="s1">&#39;months&#39;</span><span class="p">,</span></div><div class='line' id='LC804'>				<span class="nx">navFnc</span><span class="o">:</span> <span class="s1">&#39;FullYear&#39;</span><span class="p">,</span></div><div class='line' id='LC805'>				<span class="nx">navStep</span><span class="o">:</span> <span class="mi">1</span></div><div class='line' id='LC806'>			<span class="p">},</span></div><div class='line' id='LC807'>			<span class="p">{</span></div><div class='line' id='LC808'>				<span class="nx">clsName</span><span class="o">:</span> <span class="s1">&#39;years&#39;</span><span class="p">,</span></div><div class='line' id='LC809'>				<span class="nx">navFnc</span><span class="o">:</span> <span class="s1">&#39;FullYear&#39;</span><span class="p">,</span></div><div class='line' id='LC810'>				<span class="nx">navStep</span><span class="o">:</span> <span class="mi">10</span></div><div class='line' id='LC811'>		<span class="p">}],</span></div><div class='line' id='LC812'>		<span class="nx">isLeapYear</span><span class="o">:</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">year</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC813'>			<span class="k">return</span> <span class="p">(((</span><span class="nx">year</span> <span class="o">%</span> <span class="mi">4</span> <span class="o">===</span> <span class="mi">0</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">year</span> <span class="o">%</span> <span class="mi">100</span> <span class="o">!==</span> <span class="mi">0</span><span class="p">))</span> <span class="o">||</span> <span class="p">(</span><span class="nx">year</span> <span class="o">%</span> <span class="mi">400</span> <span class="o">===</span> <span class="mi">0</span><span class="p">));</span></div><div class='line' id='LC814'>		<span class="p">},</span></div><div class='line' id='LC815'>		<span class="nx">getDaysInMonth</span><span class="o">:</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">year</span><span class="p">,</span> <span class="nx">month</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC816'>			<span class="k">return</span> <span class="p">[</span><span class="mi">31</span><span class="p">,</span> <span class="p">(</span><span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">isLeapYear</span><span class="p">(</span><span class="nx">year</span><span class="p">)</span> <span class="o">?</span> <span class="mi">29</span> <span class="o">:</span> <span class="mi">28</span><span class="p">),</span> <span class="mi">31</span><span class="p">,</span> <span class="mi">30</span><span class="p">,</span> <span class="mi">31</span><span class="p">,</span> <span class="mi">30</span><span class="p">,</span> <span class="mi">31</span><span class="p">,</span> <span class="mi">31</span><span class="p">,</span> <span class="mi">30</span><span class="p">,</span> <span class="mi">31</span><span class="p">,</span> <span class="mi">30</span><span class="p">,</span> <span class="mi">31</span><span class="p">][</span><span class="nx">month</span><span class="p">];</span></div><div class='line' id='LC817'>		<span class="p">},</span></div><div class='line' id='LC818'>		<span class="nx">validParts</span><span class="o">:</span> <span class="sr">/dd?|DD?|mm?|MM?|yy(?:yy)?/g</span><span class="p">,</span></div><div class='line' id='LC819'>		<span class="nx">nonpunctuation</span><span class="o">:</span> <span class="sr">/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g</span><span class="p">,</span></div><div class='line' id='LC820'>		<span class="nx">parseFormat</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">format</span><span class="p">){</span></div><div class='line' id='LC821'>			<span class="c1">// IE treats \0 as a string end in inputs (truncating the value),</span></div><div class='line' id='LC822'>			<span class="c1">// so it&#39;s a bad format delimiter, anyway</span></div><div class='line' id='LC823'>			<span class="kd">var</span> <span class="nx">separators</span> <span class="o">=</span> <span class="nx">format</span><span class="p">.</span><span class="nx">replace</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">validParts</span><span class="p">,</span> <span class="s1">&#39;\0&#39;</span><span class="p">).</span><span class="nx">split</span><span class="p">(</span><span class="s1">&#39;\0&#39;</span><span class="p">),</span></div><div class='line' id='LC824'>				<span class="nx">parts</span> <span class="o">=</span> <span class="nx">format</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">validParts</span><span class="p">);</span></div><div class='line' id='LC825'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">separators</span> <span class="o">||</span> <span class="o">!</span><span class="nx">separators</span><span class="p">.</span><span class="nx">length</span> <span class="o">||</span> <span class="o">!</span><span class="nx">parts</span> <span class="o">||</span> <span class="nx">parts</span><span class="p">.</span><span class="nx">length</span> <span class="o">===</span> <span class="mi">0</span><span class="p">){</span></div><div class='line' id='LC826'>				<span class="k">throw</span> <span class="k">new</span> <span class="nb">Error</span><span class="p">(</span><span class="s2">&quot;Invalid date format.&quot;</span><span class="p">);</span></div><div class='line' id='LC827'>			<span class="p">}</span></div><div class='line' id='LC828'>			<span class="k">return</span> <span class="p">{</span><span class="nx">separators</span><span class="o">:</span> <span class="nx">separators</span><span class="p">,</span> <span class="nx">parts</span><span class="o">:</span> <span class="nx">parts</span><span class="p">};</span></div><div class='line' id='LC829'>		<span class="p">},</span></div><div class='line' id='LC830'>		<span class="nx">parseDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">date</span><span class="p">,</span> <span class="nx">format</span><span class="p">,</span> <span class="nx">language</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC831'>			<span class="k">if</span> <span class="p">(</span><span class="nx">date</span> <span class="k">instanceof</span> <span class="nb">Date</span><span class="p">)</span> <span class="k">return</span> <span class="nx">date</span><span class="p">;</span></div><div class='line' id='LC832'>			<span class="k">if</span> <span class="p">(</span><span class="sr">/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">date</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC833'>				<span class="kd">var</span> <span class="nx">part_re</span> <span class="o">=</span> <span class="sr">/([\-+]\d+)([dmwy])/</span><span class="p">,</span></div><div class='line' id='LC834'>					<span class="nx">parts</span> <span class="o">=</span> <span class="nx">date</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="sr">/([\-+]\d+)([dmwy])/g</span><span class="p">),</span></div><div class='line' id='LC835'>					<span class="nx">part</span><span class="p">,</span> <span class="nx">dir</span><span class="p">;</span></div><div class='line' id='LC836'>				<span class="nx">date</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">();</span></div><div class='line' id='LC837'>				<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span><span class="o">=</span><span class="mi">0</span><span class="p">;</span> <span class="nx">i</span><span class="o">&lt;</span><span class="nx">parts</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC838'>					<span class="nx">part</span> <span class="o">=</span> <span class="nx">part_re</span><span class="p">.</span><span class="nx">exec</span><span class="p">(</span><span class="nx">parts</span><span class="p">[</span><span class="nx">i</span><span class="p">]);</span></div><div class='line' id='LC839'>					<span class="nx">dir</span> <span class="o">=</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">part</span><span class="p">[</span><span class="mi">1</span><span class="p">]);</span></div><div class='line' id='LC840'>					<span class="k">switch</span><span class="p">(</span><span class="nx">part</span><span class="p">[</span><span class="mi">2</span><span class="p">]){</span></div><div class='line' id='LC841'>						<span class="k">case</span> <span class="s1">&#39;d&#39;</span><span class="o">:</span></div><div class='line' id='LC842'>							<span class="nx">date</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">+</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC843'>							<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC844'>						<span class="k">case</span> <span class="s1">&#39;m&#39;</span><span class="o">:</span></div><div class='line' id='LC845'>							<span class="nx">date</span> <span class="o">=</span> <span class="nx">Datepicker</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">moveMonth</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">Datepicker</span><span class="p">.</span><span class="nx">prototype</span><span class="p">,</span> <span class="nx">date</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC846'>							<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC847'>						<span class="k">case</span> <span class="s1">&#39;w&#39;</span><span class="o">:</span></div><div class='line' id='LC848'>							<span class="nx">date</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span> <span class="o">+</span> <span class="nx">dir</span> <span class="o">*</span> <span class="mi">7</span><span class="p">);</span></div><div class='line' id='LC849'>							<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC850'>						<span class="k">case</span> <span class="s1">&#39;y&#39;</span><span class="o">:</span></div><div class='line' id='LC851'>							<span class="nx">date</span> <span class="o">=</span> <span class="nx">Datepicker</span><span class="p">.</span><span class="nx">prototype</span><span class="p">.</span><span class="nx">moveYear</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">Datepicker</span><span class="p">.</span><span class="nx">prototype</span><span class="p">,</span> <span class="nx">date</span><span class="p">,</span> <span class="nx">dir</span><span class="p">);</span></div><div class='line' id='LC852'>							<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC853'>					<span class="p">}</span></div><div class='line' id='LC854'>				<span class="p">}</span></div><div class='line' id='LC855'>				<span class="k">return</span> <span class="nx">UTCDate</span><span class="p">(</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">(),</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">(),</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">(),</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">);</span></div><div class='line' id='LC856'>			<span class="p">}</span></div><div class='line' id='LC857'>			<span class="kd">var</span> <span class="nx">parts</span> <span class="o">=</span> <span class="nx">date</span> <span class="o">&amp;&amp;</span> <span class="nx">date</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">nonpunctuation</span><span class="p">)</span> <span class="o">||</span> <span class="p">[],</span></div><div class='line' id='LC858'>				<span class="nx">date</span> <span class="o">=</span> <span class="k">new</span> <span class="nb">Date</span><span class="p">(),</span></div><div class='line' id='LC859'>				<span class="nx">parsed</span> <span class="o">=</span> <span class="p">{},</span></div><div class='line' id='LC860'>				<span class="nx">setters_order</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;yyyy&#39;</span><span class="p">,</span> <span class="s1">&#39;yy&#39;</span><span class="p">,</span> <span class="s1">&#39;M&#39;</span><span class="p">,</span> <span class="s1">&#39;MM&#39;</span><span class="p">,</span> <span class="s1">&#39;m&#39;</span><span class="p">,</span> <span class="s1">&#39;mm&#39;</span><span class="p">,</span> <span class="s1">&#39;d&#39;</span><span class="p">,</span> <span class="s1">&#39;dd&#39;</span><span class="p">],</span></div><div class='line' id='LC861'>				<span class="nx">setters_map</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC862'>					<span class="nx">yyyy</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">v</span><span class="p">){</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">setUTCFullYear</span><span class="p">(</span><span class="nx">v</span><span class="p">);</span> <span class="p">},</span></div><div class='line' id='LC863'>					<span class="nx">yy</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">v</span><span class="p">){</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">setUTCFullYear</span><span class="p">(</span><span class="mi">2000</span><span class="o">+</span><span class="nx">v</span><span class="p">);</span> <span class="p">},</span></div><div class='line' id='LC864'>					<span class="nx">m</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">v</span><span class="p">){</span></div><div class='line' id='LC865'>						<span class="nx">v</span> <span class="o">-=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC866'>						<span class="k">while</span> <span class="p">(</span><span class="nx">v</span><span class="o">&lt;</span><span class="mi">0</span><span class="p">)</span> <span class="nx">v</span> <span class="o">+=</span> <span class="mi">12</span><span class="p">;</span></div><div class='line' id='LC867'>						<span class="nx">v</span> <span class="o">%=</span> <span class="mi">12</span><span class="p">;</span></div><div class='line' id='LC868'>						<span class="nx">d</span><span class="p">.</span><span class="nx">setUTCMonth</span><span class="p">(</span><span class="nx">v</span><span class="p">);</span></div><div class='line' id='LC869'>						<span class="k">while</span> <span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()</span> <span class="o">!=</span> <span class="nx">v</span><span class="p">)</span></div><div class='line' id='LC870'>							<span class="nx">d</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="nx">d</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">()</span><span class="o">-</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC871'>						<span class="k">return</span> <span class="nx">d</span><span class="p">;</span></div><div class='line' id='LC872'>					<span class="p">},</span></div><div class='line' id='LC873'>					<span class="nx">d</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span><span class="nx">v</span><span class="p">){</span> <span class="k">return</span> <span class="nx">d</span><span class="p">.</span><span class="nx">setUTCDate</span><span class="p">(</span><span class="nx">v</span><span class="p">);</span> <span class="p">}</span></div><div class='line' id='LC874'>				<span class="p">},</span></div><div class='line' id='LC875'>				<span class="nx">val</span><span class="p">,</span> <span class="nx">filtered</span><span class="p">,</span> <span class="nx">part</span><span class="p">;</span></div><div class='line' id='LC876'>			<span class="nx">setters_map</span><span class="p">[</span><span class="s1">&#39;M&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">setters_map</span><span class="p">[</span><span class="s1">&#39;MM&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">setters_map</span><span class="p">[</span><span class="s1">&#39;mm&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">setters_map</span><span class="p">[</span><span class="s1">&#39;m&#39;</span><span class="p">];</span></div><div class='line' id='LC877'>			<span class="nx">setters_map</span><span class="p">[</span><span class="s1">&#39;dd&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="nx">setters_map</span><span class="p">[</span><span class="s1">&#39;d&#39;</span><span class="p">];</span></div><div class='line' id='LC878'>			<span class="nx">date</span> <span class="o">=</span> <span class="nx">UTCDate</span><span class="p">(</span><span class="nx">date</span><span class="p">.</span><span class="nx">getFullYear</span><span class="p">(),</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getMonth</span><span class="p">(),</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getDate</span><span class="p">(),</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">);</span></div><div class='line' id='LC879'>			<span class="kd">var</span> <span class="nx">fparts</span> <span class="o">=</span> <span class="nx">format</span><span class="p">.</span><span class="nx">parts</span><span class="p">.</span><span class="nx">slice</span><span class="p">();</span></div><div class='line' id='LC880'>			<span class="c1">// Remove noop parts</span></div><div class='line' id='LC881'>			<span class="k">if</span> <span class="p">(</span><span class="nx">parts</span><span class="p">.</span><span class="nx">length</span> <span class="o">!=</span> <span class="nx">fparts</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC882'>				<span class="nx">fparts</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nx">fparts</span><span class="p">).</span><span class="nx">filter</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">i</span><span class="p">,</span><span class="nx">p</span><span class="p">){</span></div><div class='line' id='LC883'>					<span class="k">return</span> <span class="nx">$</span><span class="p">.</span><span class="nx">inArray</span><span class="p">(</span><span class="nx">p</span><span class="p">,</span> <span class="nx">setters_order</span><span class="p">)</span> <span class="o">!==</span> <span class="o">-</span><span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC884'>				<span class="p">}).</span><span class="nx">toArray</span><span class="p">();</span></div><div class='line' id='LC885'>			<span class="p">}</span></div><div class='line' id='LC886'>			<span class="c1">// Process remainder</span></div><div class='line' id='LC887'>			<span class="k">if</span> <span class="p">(</span><span class="nx">parts</span><span class="p">.</span><span class="nx">length</span> <span class="o">==</span> <span class="nx">fparts</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC888'>				<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="nx">cnt</span> <span class="o">=</span> <span class="nx">fparts</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">cnt</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC889'>					<span class="nx">val</span> <span class="o">=</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">parts</span><span class="p">[</span><span class="nx">i</span><span class="p">],</span> <span class="mi">10</span><span class="p">);</span></div><div class='line' id='LC890'>					<span class="nx">part</span> <span class="o">=</span> <span class="nx">fparts</span><span class="p">[</span><span class="nx">i</span><span class="p">];</span></div><div class='line' id='LC891'>					<span class="k">if</span> <span class="p">(</span><span class="nb">isNaN</span><span class="p">(</span><span class="nx">val</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC892'>						<span class="k">switch</span><span class="p">(</span><span class="nx">part</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC893'>							<span class="k">case</span> <span class="s1">&#39;MM&#39;</span><span class="o">:</span></div><div class='line' id='LC894'>								<span class="nx">filtered</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nx">dates</span><span class="p">[</span><span class="nx">language</span><span class="p">].</span><span class="nx">months</span><span class="p">).</span><span class="nx">filter</span><span class="p">(</span><span class="kd">function</span><span class="p">(){</span></div><div class='line' id='LC895'>									<span class="kd">var</span> <span class="nx">m</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">slice</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nx">parts</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">length</span><span class="p">),</span></div><div class='line' id='LC896'>										<span class="nx">p</span> <span class="o">=</span> <span class="nx">parts</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">slice</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nx">m</span><span class="p">.</span><span class="nx">length</span><span class="p">);</span></div><div class='line' id='LC897'>									<span class="k">return</span> <span class="nx">m</span> <span class="o">==</span> <span class="nx">p</span><span class="p">;</span></div><div class='line' id='LC898'>								<span class="p">});</span></div><div class='line' id='LC899'>								<span class="nx">val</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">inArray</span><span class="p">(</span><span class="nx">filtered</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="nx">dates</span><span class="p">[</span><span class="nx">language</span><span class="p">].</span><span class="nx">months</span><span class="p">)</span> <span class="o">+</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC900'>								<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC901'>							<span class="k">case</span> <span class="s1">&#39;M&#39;</span><span class="o">:</span></div><div class='line' id='LC902'>								<span class="nx">filtered</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nx">dates</span><span class="p">[</span><span class="nx">language</span><span class="p">].</span><span class="nx">monthsShort</span><span class="p">).</span><span class="nx">filter</span><span class="p">(</span><span class="kd">function</span><span class="p">(){</span></div><div class='line' id='LC903'>									<span class="kd">var</span> <span class="nx">m</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">slice</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nx">parts</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">length</span><span class="p">),</span></div><div class='line' id='LC904'>										<span class="nx">p</span> <span class="o">=</span> <span class="nx">parts</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">slice</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nx">m</span><span class="p">.</span><span class="nx">length</span><span class="p">);</span></div><div class='line' id='LC905'>									<span class="k">return</span> <span class="nx">m</span> <span class="o">==</span> <span class="nx">p</span><span class="p">;</span></div><div class='line' id='LC906'>								<span class="p">});</span></div><div class='line' id='LC907'>								<span class="nx">val</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">inArray</span><span class="p">(</span><span class="nx">filtered</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="nx">dates</span><span class="p">[</span><span class="nx">language</span><span class="p">].</span><span class="nx">monthsShort</span><span class="p">)</span> <span class="o">+</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC908'>								<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC909'>						<span class="p">}</span></div><div class='line' id='LC910'>					<span class="p">}</span></div><div class='line' id='LC911'>					<span class="nx">parsed</span><span class="p">[</span><span class="nx">part</span><span class="p">]</span> <span class="o">=</span> <span class="nx">val</span><span class="p">;</span></div><div class='line' id='LC912'>				<span class="p">}</span></div><div class='line' id='LC913'>				<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="nx">s</span><span class="p">;</span> <span class="nx">i</span><span class="o">&lt;</span><span class="nx">setters_order</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">){</span></div><div class='line' id='LC914'>					<span class="nx">s</span> <span class="o">=</span> <span class="nx">setters_order</span><span class="p">[</span><span class="nx">i</span><span class="p">];</span></div><div class='line' id='LC915'>					<span class="k">if</span> <span class="p">(</span><span class="nx">s</span> <span class="k">in</span> <span class="nx">parsed</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nb">isNaN</span><span class="p">(</span><span class="nx">parsed</span><span class="p">[</span><span class="nx">s</span><span class="p">]))</span></div><div class='line' id='LC916'>						<span class="nx">setters_map</span><span class="p">[</span><span class="nx">s</span><span class="p">](</span><span class="nx">date</span><span class="p">,</span> <span class="nx">parsed</span><span class="p">[</span><span class="nx">s</span><span class="p">]);</span></div><div class='line' id='LC917'>				<span class="p">}</span></div><div class='line' id='LC918'>			<span class="p">}</span></div><div class='line' id='LC919'>			<span class="k">return</span> <span class="nx">date</span><span class="p">;</span></div><div class='line' id='LC920'>		<span class="p">},</span></div><div class='line' id='LC921'>		<span class="nx">formatDate</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">date</span><span class="p">,</span> <span class="nx">format</span><span class="p">,</span> <span class="nx">language</span><span class="p">){</span></div><div class='line' id='LC922'>			<span class="kd">var</span> <span class="nx">val</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC923'>				<span class="nx">d</span><span class="o">:</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getUTCDate</span><span class="p">(),</span></div><div class='line' id='LC924'>				<span class="nx">D</span><span class="o">:</span> <span class="nx">dates</span><span class="p">[</span><span class="nx">language</span><span class="p">].</span><span class="nx">daysShort</span><span class="p">[</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCDay</span><span class="p">()],</span></div><div class='line' id='LC925'>				<span class="nx">DD</span><span class="o">:</span> <span class="nx">dates</span><span class="p">[</span><span class="nx">language</span><span class="p">].</span><span class="nx">days</span><span class="p">[</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCDay</span><span class="p">()],</span></div><div class='line' id='LC926'>				<span class="nx">m</span><span class="o">:</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()</span> <span class="o">+</span> <span class="mi">1</span><span class="p">,</span></div><div class='line' id='LC927'>				<span class="nx">M</span><span class="o">:</span> <span class="nx">dates</span><span class="p">[</span><span class="nx">language</span><span class="p">].</span><span class="nx">monthsShort</span><span class="p">[</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()],</span></div><div class='line' id='LC928'>				<span class="nx">MM</span><span class="o">:</span> <span class="nx">dates</span><span class="p">[</span><span class="nx">language</span><span class="p">].</span><span class="nx">months</span><span class="p">[</span><span class="nx">date</span><span class="p">.</span><span class="nx">getUTCMonth</span><span class="p">()],</span></div><div class='line' id='LC929'>				<span class="nx">yy</span><span class="o">:</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">().</span><span class="nx">toString</span><span class="p">().</span><span class="nx">substring</span><span class="p">(</span><span class="mi">2</span><span class="p">),</span></div><div class='line' id='LC930'>				<span class="nx">yyyy</span><span class="o">:</span> <span class="nx">date</span><span class="p">.</span><span class="nx">getUTCFullYear</span><span class="p">()</span></div><div class='line' id='LC931'>			<span class="p">};</span></div><div class='line' id='LC932'>			<span class="nx">val</span><span class="p">.</span><span class="nx">dd</span> <span class="o">=</span> <span class="p">(</span><span class="nx">val</span><span class="p">.</span><span class="nx">d</span> <span class="o">&lt;</span> <span class="mi">10</span> <span class="o">?</span> <span class="s1">&#39;0&#39;</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">)</span> <span class="o">+</span> <span class="nx">val</span><span class="p">.</span><span class="nx">d</span><span class="p">;</span></div><div class='line' id='LC933'>			<span class="nx">val</span><span class="p">.</span><span class="nx">mm</span> <span class="o">=</span> <span class="p">(</span><span class="nx">val</span><span class="p">.</span><span class="nx">m</span> <span class="o">&lt;</span> <span class="mi">10</span> <span class="o">?</span> <span class="s1">&#39;0&#39;</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">)</span> <span class="o">+</span> <span class="nx">val</span><span class="p">.</span><span class="nx">m</span><span class="p">;</span></div><div class='line' id='LC934'>			<span class="kd">var</span> <span class="nx">date</span> <span class="o">=</span> <span class="p">[],</span></div><div class='line' id='LC935'>				<span class="nx">seps</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">([],</span> <span class="nx">format</span><span class="p">.</span><span class="nx">separators</span><span class="p">);</span></div><div class='line' id='LC936'>			<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="nx">cnt</span> <span class="o">=</span> <span class="nx">format</span><span class="p">.</span><span class="nx">parts</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">cnt</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC937'>				<span class="k">if</span> <span class="p">(</span><span class="nx">seps</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span></div><div class='line' id='LC938'>					<span class="nx">date</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">seps</span><span class="p">.</span><span class="nx">shift</span><span class="p">());</span></div><div class='line' id='LC939'>				<span class="nx">date</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">val</span><span class="p">[</span><span class="nx">format</span><span class="p">.</span><span class="nx">parts</span><span class="p">[</span><span class="nx">i</span><span class="p">]]);</span></div><div class='line' id='LC940'>			<span class="p">}</span></div><div class='line' id='LC941'>			<span class="k">return</span> <span class="nx">date</span><span class="p">.</span><span class="nx">join</span><span class="p">(</span><span class="s1">&#39;&#39;</span><span class="p">);</span></div><div class='line' id='LC942'>		<span class="p">},</span></div><div class='line' id='LC943'>		<span class="nx">headTemplate</span><span class="o">:</span> <span class="s1">&#39;&lt;thead&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC944'>							<span class="s1">&#39;&lt;tr&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC945'>								<span class="s1">&#39;&lt;th class=&quot;prev&quot;&gt;&lt;i class=&quot;icon-arrow-left&quot;/&gt;&lt;/th&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC946'>								<span class="s1">&#39;&lt;th colspan=&quot;5&quot; class=&quot;switch&quot;&gt;&lt;/th&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC947'>								<span class="s1">&#39;&lt;th class=&quot;next&quot;&gt;&lt;i class=&quot;icon-arrow-right&quot;/&gt;&lt;/th&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC948'>							<span class="s1">&#39;&lt;/tr&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC949'>						<span class="s1">&#39;&lt;/thead&gt;&#39;</span><span class="p">,</span></div><div class='line' id='LC950'>		<span class="nx">contTemplate</span><span class="o">:</span> <span class="s1">&#39;&lt;tbody&gt;&lt;tr&gt;&lt;td colspan=&quot;7&quot;&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&#39;</span><span class="p">,</span></div><div class='line' id='LC951'>		<span class="nx">footTemplate</span><span class="o">:</span> <span class="s1">&#39;&lt;tfoot&gt;&lt;tr&gt;&lt;th colspan=&quot;7&quot; class=&quot;today&quot;&gt;&lt;/th&gt;&lt;/tr&gt;&lt;/tfoot&gt;&#39;</span></div><div class='line' id='LC952'>	<span class="p">};</span></div><div class='line' id='LC953'>	<span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">template</span> <span class="o">=</span> <span class="s1">&#39;&lt;div class=&quot;datepicker&quot;&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC954'>							<span class="s1">&#39;&lt;div class=&quot;datepicker-days&quot;&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC955'>								<span class="s1">&#39;&lt;table class=&quot; table-condensed&quot;&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC956'>									<span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">headTemplate</span><span class="o">+</span></div><div class='line' id='LC957'>									<span class="s1">&#39;&lt;tbody&gt;&lt;/tbody&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC958'>									<span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">footTemplate</span><span class="o">+</span></div><div class='line' id='LC959'>								<span class="s1">&#39;&lt;/table&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC960'>							<span class="s1">&#39;&lt;/div&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC961'>							<span class="s1">&#39;&lt;div class=&quot;datepicker-months&quot;&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC962'>								<span class="s1">&#39;&lt;table class=&quot;table-condensed&quot;&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC963'>									<span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">headTemplate</span><span class="o">+</span></div><div class='line' id='LC964'>									<span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">contTemplate</span><span class="o">+</span></div><div class='line' id='LC965'>									<span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">footTemplate</span><span class="o">+</span></div><div class='line' id='LC966'>								<span class="s1">&#39;&lt;/table&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC967'>							<span class="s1">&#39;&lt;/div&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC968'>							<span class="s1">&#39;&lt;div class=&quot;datepicker-years&quot;&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC969'>								<span class="s1">&#39;&lt;table class=&quot;table-condensed&quot;&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC970'>									<span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">headTemplate</span><span class="o">+</span></div><div class='line' id='LC971'>									<span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">contTemplate</span><span class="o">+</span></div><div class='line' id='LC972'>									<span class="nx">DPGlobal</span><span class="p">.</span><span class="nx">footTemplate</span><span class="o">+</span></div><div class='line' id='LC973'>								<span class="s1">&#39;&lt;/table&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC974'>							<span class="s1">&#39;&lt;/div&gt;&#39;</span><span class="o">+</span></div><div class='line' id='LC975'>						<span class="s1">&#39;&lt;/div&gt;&#39;</span><span class="p">;</span></div><div class='line' id='LC976'><br/></div><div class='line' id='LC977'>	<span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">datepicker</span><span class="p">.</span><span class="nx">DPGlobal</span> <span class="o">=</span> <span class="nx">DPGlobal</span><span class="p">;</span></div><div class='line' id='LC978'><br/></div><div class='line' id='LC979'><span class="p">}(</span> <span class="nb">window</span><span class="p">.</span><span class="nx">jQuery</span> <span class="p">);</span></div></pre></div>
          </td>
        </tr>
      </table>
  </div>

          </div>
        </div>

        <a href="#jump-to-line" rel="facebox" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
        <div id="jump-to-line" style="display:none">
          <h2>Jump to Line</h2>
          <form accept-charset="UTF-8" class="js-jump-to-line-form">
            <input class="textfield js-jump-to-line-field" type="text">
            <div class="full-button">
              <button type="submit" class="button">Go</button>
            </div>
          </form>
        </div>

      </div>
    </div>
</div>

<div id="js-frame-loading-template" class="frame frame-loading large-loading-area" style="display:none;">
  <img class="js-frame-loading-spinner" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-128.gif?1347543525" height="64" width="64">
</div>


        </div>
      </div>
      <div class="context-overlay"></div>
    </div>

      <div id="footer-push"></div><!-- hack for sticky footer -->
    </div><!-- end of wrapper - hack for sticky footer -->

      <!-- footer -->
      <div id="footer">
  <div class="container clearfix">

      <dl class="footer_nav">
        <dt>GitHub</dt>
        <dd><a href="https://github.com/about">About us</a></dd>
        <dd><a href="https://github.com/blog">Blog</a></dd>
        <dd><a href="https://github.com/contact">Contact &amp; support</a></dd>
        <dd><a href="http://enterprise.github.com/">GitHub Enterprise</a></dd>
        <dd><a href="http://status.github.com/">Site status</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Applications</dt>
        <dd><a href="http://mac.github.com/">GitHub for Mac</a></dd>
        <dd><a href="http://windows.github.com/">GitHub for Windows</a></dd>
        <dd><a href="http://eclipse.github.com/">GitHub for Eclipse</a></dd>
        <dd><a href="http://mobile.github.com/">GitHub mobile apps</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Services</dt>
        <dd><a href="http://get.gaug.es/">Gauges: Web analytics</a></dd>
        <dd><a href="http://speakerdeck.com">Speaker Deck: Presentations</a></dd>
        <dd><a href="https://gist.github.com">Gist: Code snippets</a></dd>
        <dd><a href="http://jobs.github.com/">Job board</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Documentation</dt>
        <dd><a href="http://help.github.com/">GitHub Help</a></dd>
        <dd><a href="http://developer.github.com/">Developer API</a></dd>
        <dd><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></dd>
        <dd><a href="http://pages.github.com/">GitHub Pages</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>More</dt>
        <dd><a href="http://training.github.com/">Training</a></dd>
        <dd><a href="https://github.com/edu">Students &amp; teachers</a></dd>
        <dd><a href="http://shop.github.com">The Shop</a></dd>
        <dd><a href="/plans">Plans &amp; pricing</a></dd>
        <dd><a href="http://octodex.github.com/">The Octodex</a></dd>
      </dl>

      <hr class="footer-divider">


    <p class="right">&copy; 2013 <span title="0.08286s from fe17.rs.github.com">GitHub</span> Inc. All rights reserved.</p>
    <a class="left" href="https://github.com/">
      <span class="mega-icon mega-icon-invertocat"></span>
    </a>
    <ul id="legal">
        <li><a href="https://github.com/site/terms">Terms of Service</a></li>
        <li><a href="https://github.com/site/privacy">Privacy</a></li>
        <li><a href="https://github.com/security">Security</a></li>
    </ul>

  </div><!-- /.container -->

</div><!-- /.#footer -->


    

    

<div id="keyboard_shortcuts_pane" class="instapaper_ignore readability-extra" style="display:none">
  <h2>Keyboard Shortcuts <small><a href="#" class="js-see-all-keyboard-shortcuts">(see all)</a></small></h2>

  <div class="columns threecols">
    <div class="column first">
      <h3>Site wide shortcuts</h3>
      <dl class="keyboard-mappings">
        <dt>s</dt>
        <dd>Focus command bar</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>?</dt>
        <dd>Bring up this help dialog</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column middle" style='display:none'>
      <h3>Commit list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>c <em>or</em> o <em>or</em> enter</dt>
        <dd>Open commit</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>y</dt>
        <dd>Expand URL to its canonical form</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column last js-hidden-pane" style='display:none'>
      <h3>Pull request list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>o <em>or</em> enter</dt>
        <dd>Open issue</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
        <dd>Submit comment</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> shift p</dt>
        <dd>Preview comment</dd>
      </dl>
    </div><!-- /.columns.last -->

  </div><!-- /.columns.equacols -->

  <div class="js-hidden-pane" style='display:none'>
    <div class="rule"></div>

    <h3>Issues</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>x</dt>
          <dd>Toggle selection</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> shift p</dt>
          <dd>Preview comment</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>c</dt>
          <dd>Create issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Create label</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>i</dt>
          <dd>Back to inbox</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>u</dt>
          <dd>Back to issues</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>/</dt>
          <dd>Focus issues search</dd>
        </dl>
      </div>
    </div>
  </div>

  <div class="js-hidden-pane" style='display:none'>
    <div class="rule"></div>

    <h3>Issues Dashboard</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
      </div><!-- /.column.first -->
    </div>
  </div>

  <div class="js-hidden-pane" style='display:none'>
    <div class="rule"></div>

    <h3>Network Graph</h3>
    <div class="columns equacols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt><span class="badmono">←</span> <em>or</em> h</dt>
          <dd>Scroll left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">→</span> <em>or</em> l</dt>
          <dd>Scroll right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↑</span> <em>or</em> k</dt>
          <dd>Scroll up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↓</span> <em>or</em> j</dt>
          <dd>Scroll down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Toggle visibility of head labels</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">←</span> <em>or</em> shift h</dt>
          <dd>Scroll all the way left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">→</span> <em>or</em> shift l</dt>
          <dd>Scroll all the way right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↑</span> <em>or</em> shift k</dt>
          <dd>Scroll all the way up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↓</span> <em>or</em> shift j</dt>
          <dd>Scroll all the way down</dd>
        </dl>
      </div><!-- /.column.last -->
    </div>
  </div>

  <div class="js-hidden-pane" >
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first js-hidden-pane" >
        <h3>Source Code Browsing</h3>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Activates the file finder</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Jump to line</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>w</dt>
          <dd>Switch branch/tag</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Expand URL to its canonical form</dd>
        </dl>
      </div>
    </div>
  </div>

  <div class="js-hidden-pane" style='display:none'>
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first">
        <h3>Browsing Commits</h3>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>escape</dt>
          <dd>Close form</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>p</dt>
          <dd>Parent commit</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o</dt>
          <dd>Other parent commit</dd>
        </dl>
      </div>
    </div>
  </div>

  <div class="js-hidden-pane" style='display:none'>
    <div class="rule"></div>
    <h3>Notifications</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open notification</dd>
        </dl>
      </div><!-- /.column.first -->

      <div class="column second">
        <dl class="keyboard-mappings">
          <dt>e <em>or</em> shift i <em>or</em> y</dt>
          <dd>Mark as read</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift m</dt>
          <dd>Mute thread</dd>
        </dl>
      </div><!-- /.column.first -->
    </div>
  </div>

</div>

    <div id="markdown-help" class="instapaper_ignore readability-extra">
  <h2>Markdown Cheat Sheet</h2>

  <div class="cheatsheet-content">

  <div class="mod">
    <div class="col">
      <h3>Format Text</h3>
      <p>Headers</p>
      <pre>
# This is an &lt;h1&gt; tag
## This is an &lt;h2&gt; tag
###### This is an &lt;h6&gt; tag</pre>
     <p>Text styles</p>
     <pre>
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__

*You **can** combine them*
</pre>
    </div>
    <div class="col">
      <h3>Lists</h3>
      <p>Unordered</p>
      <pre>
* Item 1
* Item 2
  * Item 2a
  * Item 2b</pre>
     <p>Ordered</p>
     <pre>
1. Item 1
2. Item 2
3. Item 3
   * Item 3a
   * Item 3b</pre>
    </div>
    <div class="col">
      <h3>Miscellaneous</h3>
      <p>Images</p>
      <pre>
![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)
</pre>
     <p>Links</p>
     <pre>
http://github.com - automatic!
[GitHub](http://github.com)</pre>
<p>Blockquotes</p>
     <pre>
As Kanye West said:

> We're living the future so
> the present is our past.
</pre>
    </div>
  </div>
  <div class="rule"></div>

  <h3>Code Examples in Markdown</h3>
  <div class="col">
      <p>Syntax highlighting with <a href="http://github.github.com/github-flavored-markdown/" title="GitHub Flavored Markdown" target="_blank">GFM</a></p>
      <pre>
```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```</pre>
    </div>
    <div class="col">
      <p>Or, indent your code 4 spaces</p>
      <pre>
Here is a Python code example
without syntax highlighting:

    def foo:
      if not bar:
        return true</pre>
    </div>
    <div class="col">
      <p>Inline code for comments</p>
      <pre>
I think you should use an
`&lt;addr&gt;` element here instead.</pre>
    </div>
  </div>

  </div>
</div>


    <div id="ajax-error-message" class="flash flash-error">
      <span class="mini-icon mini-icon-exclamation"></span>
      Something went wrong with that request. Please try again.
      <a href="#" class="mini-icon mini-icon-remove-close ajax-error-dismiss"></a>
    </div>

    
    
    <span id='server_response_time' data-time='0.08424' data-host='fe17'></span>
    
  </body>
</html>

