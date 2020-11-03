def create_classes(db):
    class Mobility(db.Model):
        __tablename__ = 'google_data'

        id = db.Column(db.Integer, primary_key=True)
        states = db.Column(db.String(64))
        dates = db.Column(db.String(64))
        sma_retail_recreation = db.Column(db.Float)
        sma_grocery_pharmacy = db.Column(db.Float)
        sma_parks = db.Column(db.Float)
        sma_transit = db.Column(db.Float)
        sma_workplaces = db.Column(db.Float)
        sma_residential = db.Column(db.Float)

        def __repr__(self):
            return '<Mobility %r>' % (self.states)
    return Mobility
