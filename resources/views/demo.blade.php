<md-dialog aria-label="Mango (Fruit)"  ng-cloak>
    <form>
        <md-toolbar>
            <div class="md-toolbar-tools">
                <h2>Mango (Fruit)</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="cancel()">
                    {{--<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>--}}
                </md-button>
            </div>
        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content">
                <h2>Using .md-dialog-content class that sets the padding as the spec</h2>

            </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
            <md-button href="http://en.wikipedia.org/wiki/Mango" target="_blank" md-autofocus>
                More on Wikipedia
            </md-button>

        </md-dialog-actions>
    </form>
</md-dialog>