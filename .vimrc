" Don't create swap files
set noswapfile

" Ignore files in ctrl+p
set wildignore+=*/tmp/*,*.so,*.swp,*.zip,node_modules*,log/*,build*
let g:ctrlp_custom_ignore = '\v[\/]\.(git|hg|svn)$'
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/]\.(git|hg|svn)$',
  \ 'file': '\v\.(exe|so|dll|log|md)$',
  \ 'link': 'some_bad_symbolic_links',
  \ }

" Syntastic javascript checker
let g:syntastic_javascript_checkers = ['eslint']

" tabs
set shiftwidth=2 tabstop=2 expandtab softtabstop=0 smarttab

